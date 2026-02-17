import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* LOGO / SOBRE */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">GearSetup</h2>
          <p className="text-sm text-softwhite/70 leading-relaxed">
            Selecionamos os melhores equipamentos para montar seu setup gamer
            ideal. Curadoria especializada com foco em qualidade e performance.
          </p>
        </div>

        {/* NAVEGAÇÃO */}
        <div>
          <h3 className="font-semibold mb-4 text-softwhite">Navegação</h3>
          <ul className="space-y-2 text-sm text-softwhite/70">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Início
              </Link>
            </li>
            <li>
              <Link
                to="/categoria/audio"
                className="hover:text-primary transition"
              >
                Headsets
              </Link>
            </li>
            <li>
              <Link
                to="/categoria/teclado"
                className="hover:text-primary transition"
              >
                Teclados
              </Link>
            </li>
            <li>
              <Link
                to="/categoria/mouse"
                className="hover:text-primary transition"
              >
                Mouse
              </Link>
            </li>
            <li>
              <Link
                to="/categoria/iluminacao"
                className="hover:text-primary transition"
              >
                Iluminação
              </Link>
            </li>
          </ul>
        </div>

        {/* INFORMAÇÕES */}
        <div>
          <h3 className="font-semibold mb-4 text-softwhite">Informações</h3>
          <ul className="space-y-2 text-sm text-softwhite/70">
            <li>
              <Link to="/sobre" className="hover:text-primary transition">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link
                to="/politica-de-privacidade"
                className="hover:text-primary transition"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link to="/termos" className="hover:text-primary transition">
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTATO / DISCLAIMER */}
        <div>
          <h3 className="font-semibold mb-4 text-softwhite">Transparência</h3>
          <p className="text-sm text-softwhite/70 leading-relaxed">
            Como Associado da Amazon, ganhamos comissões por compras
            qualificadas feitas através dos nossos links. Isso não altera o
            preço final para você.
          </p>
        </div>
      </div>

      {/* BARRA FINAL */}
      <div className="border-t border-slate-800 text-center py-6 text-xs text-softwhite/50">
        © {currentYear} GearSetup. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
