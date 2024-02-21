import NextAuth from "next-auth"
import { User} from "@/app/models/User";
import bcrypt from "bcryptjs";
import * as mongoose from "mongoose"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/libs/mongoConnect";
// import GithubProvider from "next-auth/providers/github"
 
export  const authOptions = {
  secret:process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
    providers: [
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
            mongoose.connect("mongodb://127.0.0.1:27017/food")

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
      }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }