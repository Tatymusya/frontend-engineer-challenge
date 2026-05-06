export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface UpdateProfileData {
  firstName: string
  lastName: string
  email: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

export interface ProfileApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}