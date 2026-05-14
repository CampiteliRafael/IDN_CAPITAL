import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
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

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(variants[variant], sizes[size], 'rounded-lg transition-colors', className)}
      {...rest}
    >
      {children}
    </button>
  );
}
