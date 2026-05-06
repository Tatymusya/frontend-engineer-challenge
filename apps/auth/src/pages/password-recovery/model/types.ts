export interface PasswordRecoveryRequest {
  email: string
}

export interface PasswordRecoveryResponse {
  success: boolean
  message: string
  token?: string
}

export interface PasswordResetRequest {
  token: string
  newPassword: string
}

export interface PasswordResetResponse {
  success: boolean
  message: string
}