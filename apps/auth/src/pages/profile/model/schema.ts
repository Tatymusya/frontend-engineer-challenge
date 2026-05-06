import { z } from 'zod'

export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }).max(50),
  lastName: z.string().min(1, { message: 'Last name is required' }).max(50),
  email: z.string().email({ message: 'Invalid email address' })
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required' }),
  newPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  confirmNewPassword: z.string()
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ['confirmNewPassword']
})

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>