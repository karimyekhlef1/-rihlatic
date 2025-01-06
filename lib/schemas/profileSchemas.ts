import { z } from 'zod';

export const passwordChangeSchema = z.object({
  old_password: z.string()
    .min(1, 'Current password is required'),
  password: z.string()
    .min(8, 'New password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  password_confirmation: z.string()
    .min(1, 'Password confirmation is required')
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

export const accountDetailsSchema = z.object({
  first_name: z.string()
    .min(2, 'First name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces'),
  last_name: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces'),
  email: z.string()
    .email('Invalid email address'),
  phone: z.string()
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format')
    .optional()
    .or(z.literal('')),
  birthday: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional()
    .or(z.literal('')),
  passport_nbr: z.string()
    .regex(/^[A-Z0-9]{6,9}$/, 'Invalid passport number format')
    .optional()
    .or(z.literal('')),
  passport_expire_at: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional()
    .or(z.literal('')),
  nationality: z.string()
    .min(2, 'Nationality must be at least 2 characters')
    .optional()
    .or(z.literal('')),
  sex: z.enum(['male', 'female', ''])
    .optional(),
});

export const avatarSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 1024 * 1024, 'File size must be less than 1MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
      'File must be an image (JPEG, PNG, or GIF)'
    )
});
