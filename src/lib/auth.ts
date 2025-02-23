
import axios from "axios";
import { API_URL } from "./API";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "username", type: "text", placeholder: "wignn" },
        password: { label: "password", type: "password" },
      },
      
      async authorize(credentials, req) {
        console.log("Credentials:", credentials);

        if (!credentials?.username || !credentials?.password) {
          console.log("Missing username or password");
          return null;
        }

        const { username, password } = credentials;

        const response = await axios.patch(`${API_URL}/api/auth/login`, {
          username,
          password,
        });
        console.log("Response:", response);

        
        if (response.status === 401) {
          console.log("Unauthorized:", response.statusText);
          return null;
        }

  
        console.log("User:", response.data.data);

        if (!response || !response.data) {
          console.log("User not found or data is missing");
          return null;
        }
        return response.data.data ;
      },
    }),
  ],
  pages: {
    signIn: "/sign",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
};
