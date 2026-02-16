import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../../data/products";
import StarRating from "../../components/StarRating/StarRating";

const Product = () => {
  const { slug } = useParams();

  const product = products.find((p) => p.slug === slug);

  // 🔥 Scroll para o topo ao trocar produto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // 🔥 SEO + STRUCTURED DATA
  useEffect(() => {
    if (!product) return;

    document.title = `${product.title} | GearSetup`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", product.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", product.title);

    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (ogDescription)
      ogDescription.setAttribute("content", product.description);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute("content", product.image);

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
      aggregateRating: product.rating
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviews || 0,
          }
        : undefined,
      offers: {
        "@type": "Offer",
        url: window.location.href,
        priceCurrency: "BRL",
        price: product.price,
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

  // 🔥 Prova social dinâmica
  const viewersToday = Math.floor(Math.random() * 120) + 30;

  // 🔥 Produtos relacionados
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  // 🔥 Cálculo de desconto
  const discountPercentage =
    product.originalPrice &&
    Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    );

  return (
    <div className="space-y-20 pb-24">
      {/* PRODUTO PRINCIPAL */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* IMAGEM */}
        <div className="relative">
          {discountPercentage && (
            <span className="absolute top-4 left-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}

          <img
            src={product.image}
            alt={product.title}
            className="rounded-xl w-full object-cover"
          />
        </div>

        {/* INFORMAÇÕES */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>

          {product.rating && (
            <div className="mb-4">
              <StarRating
                rating={product.rating}
                reviews={product.reviews || 0}
              />
            </div>
          )}

          {/* PREÇO */}
          <div className="mb-4">
            {product.originalPrice && (
              <p className="text-softwhite/50 line-through text-lg">
                {product.originalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            )}

            <p className="text-3xl font-bold text-primary">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>

            {discountPercentage && (
              <p className="text-green-400 font-semibold mt-1">
                Economize {discountPercentage}%
              </p>
            )}

            {/* 🔥 Prova social */}
            <p className="text-sm text-primary mt-2">
              🔥 {viewersToday} pessoas visualizaram hoje
            </p>
          </div>

          <p className="text-softwhite/70 mb-6">{product.description}</p>

          {/* BENEFÍCIOS */}
          {product.features && product.features.length > 0 && (
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
            rel="noopener noreferrer"
            className="block w-full text-center bg-primary text-background font-bold py-4 rounded-xl hover:scale-105 transition duration-300 shadow-lg shadow-primary/30"
          >
            🔥 Ver Oferta Agora
          </a>

          {/* 🔥 Urgência */}
          <p className="text-sm text-yellow-400 mt-3 font-medium">
            ⚡ Oferta pode acabar a qualquer momento
          </p>

          <div className="mt-6 text-sm text-softwhite/60">
            ✔ Compra segura <br />
            ✔ Produto avaliado por usuários <br />✔ Link oficial do vendedor
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
            {relatedProducts.map((item) => {
              const relatedDiscount =
                item.originalPrice &&
                Math.round(
                  ((item.originalPrice - item.price) / item.originalPrice) *
                    100,
                );

              return (
                <Link
                  key={item.slug}
                  to={`/product/${item.slug}`}
                  className="relative bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-primary hover:scale-105 transition duration-300"
                >
                  {relatedDiscount && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{relatedDiscount}%
                    </span>
                  )}

                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-lg mb-4 h-40 w-full object-cover"
                  />

                  <h3 className="font-semibold mb-2">{item.title}</h3>

                  {item.originalPrice && (
                    <p className="text-softwhite/50 line-through text-sm">
                      {item.originalPrice.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  )}

                  <p className="text-primary font-bold mb-2">
                    {item.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                  {item.rating && (
                    <StarRating
                      rating={item.rating}
                      reviews={item.reviews || 0}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 🔥 BOTÃO FLUTUANTE MOBILE */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-950 border-t border-slate-800 p-4 md:hidden z-50">
        <a
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-primary text-background font-bold py-3 rounded-xl shadow-lg shadow-primary/40 animate-pulse"
        >
          🔥 Ver Oferta por{" "}
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </a>
      </div>
    </div>
  );
};

export default Product;
