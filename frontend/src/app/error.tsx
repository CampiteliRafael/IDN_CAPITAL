'use client';

import { useEffect } from 'react';
import Button from './components/ui/Button';

interface ErrorProps {
  error: Error & { disgest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
      <h2 className="text=2x1 font-bold text-gold-light">Algo deu errado</h2>
      <p className="text-white/70 text-sm">{error.message}</p>
      <Button onClick={reset} variant="outline">
        Tentar novamente
      </Button>
    </div>
  );
}
