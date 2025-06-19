export interface User {
  uid: string;
  email: string;
  name: string;
  username: string;
  profilePicture: string;
  bio: string;
  followers: number;
  following: number;
  type: "CONTRIBUIDOR" | "PADRAO" | null
}