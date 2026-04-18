import Image from 'next/image';

export default function Footer() {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 mt-10">
        <div>
          <Image src="/idn_logoname.png" alt="Logo" height={60} width={250} />
          <p className="text-gray-400 text-sm">
            Plataforma completa para gestão inteligente de investimentos
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Produto</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#features" className="hover:text-gold-light">
                Funcionalidades
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-gold-light">
                Preços
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-gold-light">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Empresa</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#about" className="hover:text-gold-light">
                Sobre
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gold-light">
                Contato
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-gold-light">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Redes Sociais</h4>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-gold-light">
              <span className="text-2xl">𝕏</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gold-light">
              <span className="text-2xl">in</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gold-light">
              <span className="text-2xl">▶</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
        <p>© 2026 IDN Capital. Todos os direitos reservados. | MIT License</p>
      </div>
    </div>
  );
}
