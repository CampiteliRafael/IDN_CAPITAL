'use client';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/components/ui/Button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector, clearError, registerThunk } from '@/lib/store';
import { RegisterSchema } from '@/lib/validations/auth';
import z from 'zod';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const router = useRouter();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

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
      await dispatch(registerThunk({ email, password, name })).unwrap();
    } catch (_error) {}
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 pt-30 pb-10">
      <Image
        src="/herosection1.png"
        alt="Background"
        fill
        className="object-cover"
        priority
        quality={75}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10"></div>

      <div className="relative z-20 w-full max-w-md">
        <form
          className="bg-moss-light/80 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gold-light/20"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-2 text-center text-gold-light">Bem-vindo</h2>
          <p className="text-center text-white/80 mb-8 text-sm">
            Faça seu registro para acessar sua conta e aproveitar nossos serviços exclusivos!
          </p>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Nome
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) dispatch(clearError());
                if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
              }}
              type="text"
              disabled={loading}
              id="name"
              name="name"
              autoComplete="name"
              required
              className="w-full bg-white/10 backdrop-blur-sm border border-gold-light/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-light
  focus:border-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Seu Nome"
            />
            {fieldErrors.name && <p className="mt-1 text-sm text-red-300">{fieldErrors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) dispatch(clearError());
                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }}
              type="email"
              disabled={loading}
              id="email"
              name="email"
              autoComplete="email"
              required
              className="w-full bg-white/10 backdrop-blur-sm border border-gold-light/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-light
  focus:border-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="seu@email.com"
            />
            {fieldErrors.email && <p className="mt-1 text-sm text-red-300">{fieldErrors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
              Senha
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) dispatch(clearError());
                if (fieldErrors.password)
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              type="password"
              id="password"
              disabled={loading}
              name="password"
              autoComplete="current-password"
              required
              className="w-full bg-white/10 backdrop-blur-sm border border-gold-light/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-light
  focus:border-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="••••••••"
            />
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-300">{fieldErrors.password}</p>
            )}
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm">
              <p className="text-red-200 text-sm text-center">{error}</p>
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
              href="/login"
              className="text-gold-light hover:text-gold font-semibold transition-colors"
            >
              Faça login
            </Link>
          </p>
          <p className="text-center mt-6 text-white/70 text-sm">
            <Link href="/" className="hover:text-gold-light transition-colors">
              Voltar para a página inicial
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
