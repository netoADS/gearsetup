import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { rankings } from "../../data/rankings";
import { products } from "../../data/products";

const Ranking = () => {
  const { slug } = useParams();

  const ranking = rankings.find((r) => r.slug === slug);

  if (!ranking) {
    return <div className="py-20 text-center">Ranking não encontrado</div>;
  }

  const rankingProducts = ranking.products
    .map((prodSlug) => products.find((p) => p.slug === prodSlug))
    .filter((p) => p !== undefined);

  // 🔥 SEO + Structured Data ItemList
  useEffect(() => {
    document.title = `${ranking.title} | SetupTech`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", ranking.description);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: ranking.title,
      itemListElement: rankingProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product?.title,
        url: `${window.location.origin}/product/${product?.slug}`,
      })),
    };

    const existingScript = document.getElementById("ranking-structured");
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ranking-structured";
    script.innerHTML = JSON.stringify(structuredData);

    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById("ranking-structured");
      if (cleanup) cleanup.remove();
    };
  }, [ranking]);

  // 🔥 Tracking simples
  const handleAffiliateClick = (productTitle: string) => {
    console.log("Clique afiliado:", productTitle);
  };

  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-3xl font-bold mb-4">{ranking.title}</h1>
        <p className="text-softwhite/70">{ranking.description}</p>
      </div>

      {/* 🔥 TABELA COMPARATIVA */}
      <div className="overflow-x-auto">
        <table className="w-full border border-slate-800 rounded-xl">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-4 text-left">Produto</th>
              <th className="p-4 text-left">Avaliação</th>
              <th className="p-4 text-left">Preço</th>
              <th className="p-4 text-left">Link</th>
            </tr>
          </thead>
          <tbody>
            {rankingProducts.map((product) => (
              <tr key={product?.slug} className="border-t border-slate-800">
                <td className="p-4">{product?.title}</td>
                <td className="p-4">⭐ {product?.rating}</td>
                <td className="p-4">
                  {product?.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="p-4">
                  <a
                    href={product?.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleAffiliateClick(product?.title || "")}
                    className="bg-primary text-background px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
                  >
                    Ver Oferta
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 LISTA ESTILO REVIEW */}
      <div className="space-y-10">
        {rankingProducts.map((product, index) => (
          <div
            key={product?.slug}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6"
          >
            <span className="text-primary font-bold text-xl">#{index + 1}</span>

            <h2 className="text-2xl font-semibold mt-2 mb-3">
              {product?.title}
            </h2>

            <p className="text-softwhite/70 mb-4">{product?.description}</p>

            <Link
              to={`/product/${product?.slug}`}
              className="text-primary font-semibold hover:underline"
            >
              Ver análise completa →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
