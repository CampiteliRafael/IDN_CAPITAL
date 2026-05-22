'use client';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import AuthPageShell from '@/app/components/auth/AuthPageShell';
import AuthTextField from '@/app/components/auth/AuthTextField';
import Button from '@/app/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { useAuth, useRequireAuth } from '@/hooks/useAuth';
import { RegisterSchema } from '@/lib/validations/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const { loading, error, clearError, register } = useAuth();
  useRequireAuth();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = RegisterSchema.safeParse({ name, email, password });

    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors;
      setFieldErrors({
        name: errors.name?.[0],
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }

    setFieldErrors({});

    try {
      await register({ email, password, name }).unwrap();
    } catch (_error) {}
  };

  return (
    <AuthPageShell
      title="Bem-vindo"
      description="Faça seu registro para acessar sua conta e aproveitar nossos serviços exclusivos!"
    >
      <form
        onSubmit={handleSubmit}
        aria-labelledby="auth-page-title"
        aria-describedby="auth-page-description"
      >
        <AuthTextField
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) clearError();
            if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
          }}
          type="text"
          disabled={loading}
          id="name"
          name="name"
          autoComplete="name"
          required
          placeholder="Seu nome"
          label="Nome"
          error={fieldErrors.name}
        />

        <AuthTextField
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) clearError();
            if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }}
          type="email"
          disabled={loading}
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
          type="password"
          id="password"
          disabled={loading}
          name="password"
          autoComplete="new-password"
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

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Cadastrar'}
        </Button>

        <p className="mt-6 text-center text-sm text-white/80">
          Já possui uma conta?{' '}
          <Link
            href={ROUTES.LOGIN}
            className="font-semibold text-gold-light transition-colors hover:text-gold"
          >
            Faça login
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
