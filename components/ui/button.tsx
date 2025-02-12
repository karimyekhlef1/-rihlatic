import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        ghost2: ' hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        rihlatic:
          'text-orange-500 w-full h-12 px-6 rounded-lg drop-shadow bg-white border-solid border-2 border-orange-500 font-semibold hover:bg-orange-500 hover:text-white',
        rihlatic2:
          'bg-[#f4f4f4] font-normal rounded-md text-secondary-foreground hover:bg-[#f6f6f6]/20',
        normal: 'bg-white text-black rounded-md border-gray-100 border-2',
        active: 'bg-orange-500 text-white font-semibold',
        unactive: 'bg-[#f6ddc3] text-orange-500 font-semibold',
        search:
          'bg-white text-[#64656a] text-md rounded-lg border-[#bac7d5] border-[1px]',
        login:
          'text-orange-500 w-full h-12 px-6  g-white font-semibold hover:text-orange-700',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
