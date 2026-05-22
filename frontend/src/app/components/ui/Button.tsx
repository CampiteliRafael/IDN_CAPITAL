import { cn } from '@/utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-2 text-base',
  lg: 'px-8 py-3 text-lg',
};

const variants = {
  primary: 'bg-moss text-white hover:bg-moss-dark',
  secondary: 'border-1 border-moss bg-gold-light text-moss-dark hover:bg-gold hover:text-white',
  outline: 'border-1 border-moss text-moss hover:bg-moss hover:text-white',
};

interface ButtonClassNameOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function getButtonClassName({
  variant = 'primary',
  size = 'md',
  className,
}: ButtonClassNameOptions = {}) {
  return cn(
    variants[variant],
    sizes[size],
    'inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
    className
  );
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button className={getButtonClassName({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
