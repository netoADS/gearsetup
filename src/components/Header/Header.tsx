const Header = () => {
  return (
    <header className="w-full bg-slate-950 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-500">GearSetup</h1>

        <nav className="hidden md:flex gap-6 text-slate-300">
          <a href="#" className="hover:text-blue-400 transition">
            Produtos
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Comparativo
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
