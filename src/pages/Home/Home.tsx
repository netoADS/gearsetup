import { categories } from "../../data/categories";
import { products } from "../../data/products";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import StarRating from "../../components/StarRating/StarRating";
import { Link } from "react-router-dom";

const Home = () => {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <div>
      {/* HERO */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-primary">Gear</span>
          <span className="text-accent">Setup</span>
        </h1>

        <p className="text-softwhite/70 text-lg">
          A melhor curadoria para elevar seu setup
        </p>
      </section>

      {/* 🔥 TOP PICKS */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-10">🔥 Top Picks da Semana</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.slug}
              to={`/product/${product.slug}`}
              className="relative bg-slate-900 border border-primary/30 rounded-xl p-5 hover:scale-105 transition duration-300 shadow-lg shadow-primary/10"
            >
              {/* Badge */}
              <span className="absolute top-3 right-3 bg-primary text-background text-xs px-3 py-1 rounded-full font-semibold">
                Destaque
              </span>

              <img
                src={product.image}
                alt={product.title}
                className="rounded-lg mb-4 h-40 w-full object-cover"
              />

              <h3 className="font-semibold mb-2">{product.title}</h3>

              <p className="text-primary font-bold mb-2">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              {/* ⭐ Rating */}
              <StarRating rating={product.rating} reviews={product.reviews} />
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section>
        <h2 className="text-2xl font-semibold mb-8 text-softwhite">
          Explore por Categoria
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
