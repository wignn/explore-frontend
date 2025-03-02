import "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    username: string;
    token: string;    
    id: string;
    user: {
      name: string;
      email: string;
      image: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    username: string;
    token: string;    
    id: string;
    exp: number;
    iat: number;
    isAdmin: boolean;
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
