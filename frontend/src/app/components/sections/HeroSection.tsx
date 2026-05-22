import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { getButtonClassName } from '../ui/Button';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-28 items-center px-6 py-40 md:px-10"
    >
      <Image
        src="/herosection1.png"
        alt=""
        fill
        className="object-cover"
        priority
        quality={90}
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 to-black/30" />

      <div className="relative z-20 container">
        <div className="max-w-3xl">
          <h1 className="mb-2 text-5xl font-bold text-white md:text-6xl">
            Invista com <span className="text-gold-light">Inteligência</span>
          </h1>

          <p className="text-xl text-white/90">
            Plataforma completa para gestão de investimentos com análises em tempo real
          </p>

          <div className="flex gap-4 pt-10">
            <Link
              href={ROUTES.REGISTER}
              className={getButtonClassName({
                variant: 'secondary',
                size: 'lg',
                className: 'cursor-pointer',
              })}
            >
              Começar Grátis
            </Link>
            <Link
              href={`${ROUTES.HOME}#how-it-works`}
              className={getButtonClassName({
                variant: 'outline',
                size: 'lg',
                className: 'cursor-pointer border-white text-white hover:bg-white/10',
              })}
            >
              Saiba Mais
            </Link>
          </div>

          <div className="mt-12 flex gap-8 text-white/80">
            <div>
              <div className="text-3xl font-bold text-gold-light">10k+</div>
              <div className="text-sm">Investidores</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold-light">R$ 50M+</div>
              <div className="text-sm">Investidos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold-light">4.9★</div>
              <div className="text-sm">Avaliação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
