import { cn } from '@/utils/cn';
import type { InputHTMLAttributes } from 'react';

interface AuthTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function AuthTextField({
  id,
  label,
  error,
  className,
  ...props
}: AuthTextFieldProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          'w-full rounded-lg border border-gold-light/30 bg-white/10 px-4 py-3 text-white transition-all placeholder-white/50 backdrop-blur-sm focus:border-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-300 focus:border-red-200 focus:ring-red-200',
          className
        )}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
