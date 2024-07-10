import NextAuth, { getServerSession } from "next-auth"
import { User} from "@/app/models/User";
import bcrypt from "bcryptjs";
import * as mongoose from "mongoose"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/libs/mongoConnect";
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { UserInfo } from "@/app/models/Userinfo";
 
export  const authOptions = {
  secret:process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
        CredentialsProvider({
          name: "Credentials",
          id:"credentials",
          credentials: {
            username: { label: "Email", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {

                const email = credentials?.email
                const password = credentials?.password
            mongoose.connect("mongodb+srv://julius46:julius46@cluster0.97ozxzs.mongodb.net/")

            const user =  await User.findOne({email})
             const passwordOk = user && bcrypt.compareSync(password, user.password)
             if(passwordOk){
              return user
             }
            console.log({credentials})

    
          }
        })
      ],
      session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 // 30 days
      },
}

export async function isAdmin(){
  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email;
  if(!userEmail){
    return false 
  }

  const userinfo = UserInfo.findOne({email:userEmail});
  if(!userinfo){
    return false;
  }
  return userinfo.admin
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }