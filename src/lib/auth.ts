import axios from "axios";
import { API_URL } from "./API";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";




async function refreshAccessToken(token:JWT) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/refresh`, {
      username: token.username,
      isAdmin: token.isAdmin,
      sub: token.name 
  },
  {
    headers: {
        'x-api-key': process.env.API_KEY,
      Authorization: `Refresh ${token.backendTokens.refreshToken}`
    }
  }
);

    const newTokens = response.data.data.backendTokens; 
    const decodedToken = newTokens?.accessToken ? jwtDecode(newTokens.accessToken) : null;
    
    return {
      ...token,
      backendTokens:{
        ...newTokens
      },
      accessTokenExpires: decodedToken?.exp ? decodedToken.exp * 1000 : Date.now()
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { ...token, error: "RefreshTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "wignn" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const response = await axios.patch(`${API_URL}/api/auth/login`, {
          username: credentials.username,
          password: credentials.password,
        },
        {
          headers: {
            'x-api-key': process.env.API_KEY
          }
        }
      );

        if (response.status !== 200 || !response?.data) {
          return null;
        }

        const user = response.data.data;
        const newTokens = response.data.data.backendTokens;
        const decodedToken = newTokens?.accessToken ? jwtDecode(newTokens.accessToken) : null;
    
        return {
         ...user,
         accessTokenExpires: decodedToken?.exp ? decodedToken.exp * 1000 : Date.now(),
        };
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
      if (Date.now() < token.accessTokenExpires) {
        return token; 
      }
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      return {...session, ...token};
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
