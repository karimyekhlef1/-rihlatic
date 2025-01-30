import { z } from 'zod';

// Common validation patterns
const namePattern = /^[a-zA-Z\s]{2,50}$/;
const passportNumberPattern = /^[A-Z0-9]{6,9}$/;
const phonePattern = /^\+?[0-9]{10,15}$/;

export const passengerSchema = z.object({
    firstname: z.string()
    .min(2, 'First name must be at least 2 characters')
    .regex(namePattern, 'First name can only contain letters and spaces'),
    lastname: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .regex(namePattern, 'Last name can only contain letters and spaces'),
    civility: z.enum(['Mr', 'Ms', 'Mrs']),
});
export const RoomsContact = z.object({
   phone: z.string()
      .regex(phonePattern, 'Invalid phone number format'),
    email: z.string()
      .email('Invalid email format')
     
});


