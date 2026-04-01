import Link from 'next/link';
  import Image from 'next/image';
  import Button from '@/app/components/ui/Button';

  export default function LoginPage() {
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

          <form className="bg-moss-light/80 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gold-light/20">

            <h2 className="text-3xl font-bold mb-2 text-center text-gold-light">
              Bem-vindo
            </h2>
            <p className="text-center text-white/80 mb-8 text-sm">
              Faça seu registro para acessar sua conta e aproveitar nossos serviços exclusivos!
            </p>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="w-full bg-white/10 backdrop-blur-sm border border-gold-light/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-light
  focus:border-gold-light transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className="w-full bg-white/10 backdrop-blur-sm border border-gold-light/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-light
  focus:border-gold-light transition-all"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="w-full cursor-pointer"
            >
              Entrar
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