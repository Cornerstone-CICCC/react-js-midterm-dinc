export interface User {
  id: string;
  name: string;
  userName: string;
  email: string;
  bio: string;
  fileId?: string;
  location?: string;
}

export interface GetUserApiResponse {
  success: boolean;
  user: User;
};