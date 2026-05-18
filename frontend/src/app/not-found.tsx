import Link from 'next/link';
import Button from '@/app/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
      <h2 className="text-6xl font-bold text-gold-light">404</h2>
      <p className="text-white/70">Página não encontrada</p>
      <Button variant="outline">
        <Link href="/">Voltar ao início</Link>
      </Button>
    </div>
  );
}
