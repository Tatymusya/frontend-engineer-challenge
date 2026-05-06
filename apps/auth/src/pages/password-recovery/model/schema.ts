import { z } from 'zod'

export const passwordRecoverySchema = z.object({
  email: z.string().email({ message: 'Invalid email address' })
})

export const passwordResetSchema = z.object({
  newPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export type PasswordRecoveryFormData = z.infer<typeof passwordRecoverySchema>
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>