import Button from '../ui/Button';

export default function CTASection() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-gold to-gold-light">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pronto para começar?</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Junte-se a milhares de investidores que já usam nossa plataforma
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="secondary" size="lg" className="cursor-pointer">
            Criar Conta Grátis
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white cursor-pointer">
            Falar com Especialista
          </Button>
        </div>
      </div>
    </section>
  );
}
