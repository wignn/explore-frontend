export interface UserInterface {
    id: string;
    name: string;
    profilePic?: string | null;
    username: string;
    email: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
    token: string;
    valToken: string;
    isAdmin: boolean;
  }
  
  export interface NavbarProps {
    user: UserInterface | undefined;
  }

  export interface UserGetResponse {
    user: UserInterface
  }