import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../../data/products";

const Category = () => {
  const { category } = useParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const filteredProducts = products
    .filter((product) => product.category === category)
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "featured") return Number(b.featured) - Number(a.featured);
      if (sort === "az") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="space-y-12 pb-20">
      <h1 className="text-3xl font-bold capitalize">{category}</h1>

      {/* CONTROLES */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
        >
          <option value="featured">🔥 Destaques</option>
          <option value="az">🔤 Ordem A-Z</option>
        </select>
      </div>

      {/* PRODUTOS */}
      {filteredProducts.length === 0 ? (
        <p className="text-softwhite/60">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.slug}
              to={`/product/${product.slug}`}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-primary hover:scale-105 transition duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="rounded-lg mb-4 h-40 w-full object-cover"
              />

              <h3 className="font-semibold mb-2">{product.title}</h3>

              <p className="text-sm text-softwhite/70">{product.description}</p>

              <p className="text-primary font-semibold mt-3">Ver na Amazon →</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
