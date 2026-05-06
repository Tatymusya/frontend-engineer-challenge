export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  userId?: string;
}