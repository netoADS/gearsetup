import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../../data/products";

const Product = () => {
  const { slug } = useParams();

  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!product) return;

    document.title = `${product.title} | GearSetup`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", product.description);
    }

    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.title,
      image: product.image,
      description: product.description,
      brand: {
        "@type": "Brand",
        name: "GearSetup",
      },
      offers: {
        "@type": "Offer",
        url: product.affiliateLink,
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
    };

    const existingScript = document.getElementById("structured-data");
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "structured-data";
    script.innerHTML = JSON.stringify(structuredData);

    document.head.appendChild(script);

    return () => {
      const cleanupScript = document.getElementById("structured-data");
      if (cleanupScript) cleanupScript.remove();
    };
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Produto não encontrado</h2>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="space-y-20 pb-24">
      {/* PRODUTO PRINCIPAL */}
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="rounded-xl w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <p className="text-softwhite/70 mb-6">{product.description}</p>

          {/* BENEFÍCIOS */}
          {product.features.length > 0 && (
            <ul className="mb-8 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block w-full text-center bg-primary text-background font-bold py-4 rounded-xl hover:scale-105 transition duration-300 shadow-lg shadow-primary/30"
          >
            🔥 Ver preço atualizado na Amazon
          </a>

          <p className="text-sm text-yellow-400 mt-3 font-medium">
            ⚡ Confira disponibilidade e avaliações diretamente na Amazon
          </p>

          <div className="mt-6 text-sm text-softwhite/60">
            ✔ Link oficial da Amazon <br />
            ✔ Compra segura <br />✔ Informações atualizadas diretamente na loja
          </div>
        </div>
      </div>

      {/* PRODUTOS RELACIONADOS */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-8">
            🔎 Você também pode gostar
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                to={`/product/${item.slug}`}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-primary hover:scale-105 transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-lg mb-4 h-40 w-full object-cover"
                />

                <h3 className="font-semibold mb-2">{item.title}</h3>

                <p className="text-sm text-softwhite/70">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE MOBILE */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-950 border-t border-slate-800 p-4 md:hidden z-50">
        <a
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full text-center bg-primary text-background font-bold py-3 rounded-xl shadow-lg shadow-primary/40 animate-pulse"
        >
          🔥 Ver na Amazon
        </a>
      </div>
    </div>
  );
};

export default Product;
