'use client';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/components/ui/Button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector, loginThunk, clearError } from '@/lib/store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [email, password]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await dispatch(loginThunk({ email, password })).unwrap();
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
        quality={90}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10"></div>

      <div className="relative z-20 w-full max-w-md">
        <form
          className="bg-moss-light/80 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gold-light/20"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-2 text-center text-gold-light">
            Bem-vindo de volta
          </h2>
          <p className="text-center text-white/80 mb-8 text-sm">
            Entre com suas credenciais para continuar
          </p>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="w-full bg-white/10 backdrop-blur-sm border border-gold-light/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-light
  focus:border-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="seu@email.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
              Senha
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              className="w-full bg-white/10 backdrop-blur-sm border border-gold-light/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-light
  focus:border-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="mb-6 text-right">
            <Link
              href="/reset-password"
              className="text-sm text-gold-light hover:text-gold transition-colors"
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
              href="/register"
              className="text-gold-light hover:text-gold font-semibold transition-colors"
            >
              Cadastre-se
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
