import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github"

export  const authOptions = {
    providers: [
        CredentialsProvider({
         
          name: "Credentials",
          credentials: {
            username: { label: "Email", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            console.log({credentials})
    
          }
        })
      ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }