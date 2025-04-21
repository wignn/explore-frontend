import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
import { signOut } from "next-auth/react";
import axios from "axios";
import { apiRequest } from "./Request";
import { API_URL } from "@/lib/API"

interface UserResponse {
  id: string;
  name: string;
  username: string;
  token?: string;
  isAdmin: boolean;
  backendTokens?: {
    accessToken: string;
    refreshToken: string;
  };
}


async function refreshAccessToken(token: JWT) {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/refresh`,
      {
        username: token.username,
        isAdmin: token.isAdmin,
        sub: token.name,
      },
      {
        headers: {
          "x-api-key": process.env.API_KEY,
          Authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
      }
    );



    const newTokens = response.data.data.backendTokens;
    const decodedToken = newTokens?.accessToken
      ? jwtDecode(newTokens.accessToken)
      : null;

    return {
      ...token,
      backendTokens: {
        ...newTokens,
      },
      accessTokenExpires: decodedToken?.exp
        ? decodedToken.exp * 1000
        : Date.now(),
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    const cookieStore = await cookies();
    cookieStore.set("next-auth.session-token", "", { maxAge: 0 });
    signOut();
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

        // const response = await axios.patch(
        //   `${API_URL}/api/auth/login`,
        //   {
        //     username: credentials.username,
        //     password: credentials.password,
        //   },
        //   {
        //     headers: {
        //       "x-api-key": process.env.API_KEY,
        //     },          }
        // );

        const response = await apiRequest<{ data: UserResponse }>({
          endpoint: `/auth/login`,
          method: "PATCH",
          body: {
            username: credentials.username,
            password: credentials.password,
          },
        });

        if (response === null || !response?.data) {
          return null;
        }

        const user = response?.data;
        const newTokens = response.data.backendTokens;
        const decodedToken = newTokens?.accessToken
          ? jwtDecode(newTokens.accessToken)
          : null;

        return {
          ...user,
          accessTokenExpires: decodedToken?.exp
            ? decodedToken.exp * 1000
            : Date.now(),
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
      return { ...session, ...token };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
