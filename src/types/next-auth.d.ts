import "next-auth"

declare module "next-auth" {
  interface Session {
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
    id: string;
    username: string;
    token: string;

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
