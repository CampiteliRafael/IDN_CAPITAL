import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { getButtonClassName } from '../ui/Button';

export default function CTASection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-title"
      className="relative bg-gradient-to-r from-gold to-gold-light py-20 scroll-mt-28"
    >
      <div className="container text-center">
        <h2 id="cta-title" className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Pronto para começar?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
          Junte-se a milhares de investidores que já usam nossa plataforma
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href={ROUTES.REGISTER}
            className={getButtonClassName({
              variant: 'secondary',
              size: 'lg',
              className: 'cursor-pointer',
            })}
          >
            Criar Conta Grátis
          </Link>
          <Link
            href={ROUTES.LOGIN}
            className={getButtonClassName({
              variant: 'outline',
              size: 'lg',
              className: 'cursor-pointer border-white text-white',
            })}
          >
            Falar com Especialista
          </Link>
        </div>
      </div>
    </section>
  );
}
