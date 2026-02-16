import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-background/80 border-b border-slate-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-primary">Gear</span>
          <span className="text-accent">Setup</span>
        </Link>

        <div className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link
            to="/category/perifericos"
            className="hover:text-primary transition"
          >
            Categorias
          </Link>
          <Link to="/about" className="hover:text-primary transition">
            Sobre
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
