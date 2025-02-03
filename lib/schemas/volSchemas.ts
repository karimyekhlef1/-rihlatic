import { z } from 'zod';

// Common validation patterns
const namePattern = /^[a-zA-Z\s]{2,50}$/;
const passportNumberPattern = /^[A-Z0-9]{6,9}$/;
const phonePattern = /^\+?[0-9]{10,15}$/;

// Base passenger schema
export const travellerSchema = z.object({
  first_name: z.string()
    .min(2, 'First name must be at least 2 characters')
    .regex(namePattern, 'First name can only contain letters and spaces'),
  last_name: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .regex(namePattern, 'Last name can only contain letters and spaces'),
  nationality: z.string()
    .min(2, 'Nationality must be at least 2 characters'),
    gender: z.enum(['male', 'female'], {
    required_error: 'Please select a gender',
    invalid_type_error: 'Gender must be either male or female',
  }),
  birth_date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      return birthDate < today;
    }, 'Birth date cannot be in the future'),
  passport_nbr: z.string()
    .regex(passportNumberPattern, 'Invalid passport number format'),
  passport_expire_at: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .refine((date) => {
      const expiryDate = new Date(date);
      const today = new Date();
      return expiryDate > today;
    }, 'Passport expiry date must be in the future'),
  phone: z.string()
    .regex(phonePattern, 'Invalid phone number format')
    .optional(),
  passport_scan: z.string().optional(),
  email: z.string()
    .email('Invalid email format')
});

export const volContact = z.object({
   phone: z.string()
      .regex(phonePattern, 'Invalid phone number format'),
    email: z.string()
      .email('Invalid email format'),
      mobileCountry: z.string()
      .regex(phonePattern, 'Invalid phone number format'),
     
});