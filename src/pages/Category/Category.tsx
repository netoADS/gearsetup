import { useParams } from "react-router-dom";
import { useState } from "react";
import { products } from "../../data/products";
import StarRating from "../../components/StarRating/StarRating";
import { Link } from "react-router-dom";

const Category = () => {
  const { slug } = useParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const filteredProducts = products
    .filter((product) => product.category === slug)
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sort === "featured") return Number(b.featured) - Number(a.featured);
      return 0;
    });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10 capitalize">{slug}</h1>

      {/* 🔎 CONTROLES */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
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
          <option value="low">💰 Menor preço</option>
          <option value="high">💸 Maior preço</option>
          <option value="rating">⭐ Melhor avaliados</option>
        </select>
      </div>

      {/* PRODUTOS */}
      {filteredProducts.length === 0 ? (
        <p className="text-softwhite/60">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const discount =
              product.originalPrice &&
              Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100,
              );

            return (
              <Link
                key={product.slug}
                to={`/product/${product.slug}`}
                className="relative bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-primary hover:scale-105 transition duration-300"
              >
                {discount && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{discount}%
                  </span>
                )}

                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-lg mb-4 h-40 w-full object-cover"
                />

                <h3 className="font-semibold mb-2">{product.title}</h3>

                {product.originalPrice && (
                  <p className="text-softwhite/50 line-through text-sm">
                    {product.originalPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                )}

                <p className="text-primary font-bold mb-2">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                <StarRating rating={product.rating} reviews={product.reviews} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Category;
