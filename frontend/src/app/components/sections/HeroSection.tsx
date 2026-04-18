import Image from 'next/image';
import Button from '../ui/Button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center px-6 md:px-10 py-40">
      <Image
        src="/herosection1.png"
        alt="Hero Background"
        fill
        className="object-cover"
        priority
        quality={90}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>

      <div className="relative z-20 container">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            Invista com <span className="text-gold-light">Inteligência</span>
          </h1>

          <p className="text-xl text-white/90">
            Plataforma completa para gestão de investimentos com análises em tempo real
          </p>

          <div className="flex gap-4 pt-10">
            <Link href="/register">
              <Button variant="secondary" size="lg" className="cursor-pointer">
                Começar Grátis
              </Button>
            </Link>
            <Link href="#sobre">
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white/10 cursor-pointer"
              >
                Saiba Mais
              </Button>
            </Link>
          </div>

          <div className="flex gap-8 mt-12 text-white/80">
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
