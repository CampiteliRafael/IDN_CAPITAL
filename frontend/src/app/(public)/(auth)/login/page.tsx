'use client';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import AuthPageShell from '@/app/components/auth/AuthPageShell';
import AuthTextField from '@/app/components/auth/AuthTextField';
import Button from '@/app/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { useAuth, useRequireAuth } from '@/hooks/useAuth';
import { LoginSchema } from '@/lib/validations/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const { loading, error, login, clearError } = useAuth();
  useRequireAuth();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors;
      setFieldErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }

    setFieldErrors({});

    try {
      await login({ email, password }).unwrap();
    } catch (_error) {}
  };

  return (
    <AuthPageShell
      title="Bem-vindo de volta"
      description="Entre com suas credenciais para continuar"
    >
      <form
        onSubmit={handleSubmit}
        aria-labelledby="auth-page-title"
        aria-describedby="auth-page-description"
      >
        <AuthTextField
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) clearError();
            if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }}
          disabled={loading}
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          placeholder="seu@email.com"
          label="Email"
          error={fieldErrors.email}
        />

        <AuthTextField
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) clearError();
            if (fieldErrors.password)
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }}
          disabled={loading}
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          label="Senha"
          error={fieldErrors.password}
        />

        {error && (
          <div className="mb-4 text-sm text-red-500" role="alert" aria-live="polite">
            <p className="text-center text-sm text-red-200">{error}</p>
          </div>
        )}

        <div className="mb-6 text-right">
          <Link
            href="/reset-password"
            className="text-sm text-gold-light transition-colors hover:text-gold"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <Button
          type="submit"
          variant="secondary"
          disabled={loading}
          size="lg"
          className="w-full cursor-pointer"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <p className="mt-6 text-center text-sm text-white/80">
          Não tem uma conta?{' '}
          <Link
            href={ROUTES.REGISTER}
            className="font-semibold text-gold-light transition-colors hover:text-gold"
          >
            Cadastre-se
          </Link>
        </p>
        <p className="mt-6 text-center text-sm text-white/70">
          <Link href={ROUTES.HOME} className="transition-colors hover:text-gold-light">
            Voltar para a página inicial
          </Link>
        </p>
      </form>
    </AuthPageShell>
  );
}
