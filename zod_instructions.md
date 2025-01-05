# Guideline: Integrating Zod for Form Validation in a Next.js Project

This guide provides step-by-step instructions to integrate Zod for form validation into an existing Next.js project. Since the project uses Redux for state management, we will ensure compatibility with Redux state handling.

## Prerequisites

1. **Dependencies are installed already** 
I installed the proper dependencies for you by using: npm install zod @hookform/resolvers/zod react-hook-form
2. Familiarity with TypeScript, Next.js, and Redux.
3. Understanding of the existing components and state management structure.

## Steps for Integration

### 1. Define Validation Schemas with Zod

For each form component, create a corresponding Zod schema. Schemas should be defined in a new folder, `schemas`, for better organization. every schema should be exported. and every form should have its own schema in a separate file.

#### Example: `schemas/authSchemas.ts`

```typescript
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().refine((val, ctx) => val === ctx.parent.password, {
    message: 'Passwords must match',
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const verifyEmailSchema = z.object({
  code: z.string().min(6, 'Verification code must be at least 6 characters long'),
});

export const profilePictureSchema = z.object({
  picture: z.any(),
});

export const editAccountSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  phone: z.string().optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, 'Old password must be at least 6 characters long'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
});

```

### 2. Update Form Components

Replace the existing validation logic in the provided components with Zod.

#### Example: `createAccountComponent.tsx` (this is just an example, when you change a component don't delete anything important such as API calls or dispatches, etc)

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../schemas/authSchemas';
import { useDispatch } from 'react-redux';
import { signUpAction } from '../redux/actions/authActions';
import { z } from 'zod';

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function CreateAccountComponent() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    dispatch(signUpAction(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <input {...register('confirmPassword')} type="password" placeholder="Confirm Password" />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### 3. Update Redux Actions if Necessary
Ensure that form data from validated inputs aligns with Redux actions. If specific transformations or additional checks are needed, perform them after validation.

### 4. Testing and Debugging

1. Test each form component to ensure validation errors appear as expected.
2. Verify that valid data is submitted correctly and Redux state updates accordingly.
3. Check for any runtime errors or warnings from Zod or React Hook Form.

### 5. Refactor Other Components
Repeat the process for:
- `registerComponent.tsx`
- `forgotPasswordComponent.tsx`
- `verifyEmailComponent.tsx`
- `profile-picture.tsx`
- `edit-account-details.tsx`
- `edit-password.tsx`
- `OmraRoomReservationInformation.tsx`

### 6. Documentation
Document all changes and new validation schemas for future reference.

---

With these steps, you should have a seamless transition to using Zod for form validation in your Next.js project.
