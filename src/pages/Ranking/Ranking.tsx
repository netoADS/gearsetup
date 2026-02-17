import { useParams } from "react-router-dom";
import { rankings } from "../../data/rankings";

const Ranking = () => {
  const { slug } = useParams();
  const ranking = rankings.find((r) => r.slug === slug);

  if (!ranking) {
    return <div className="py-20 text-center">Ranking não encontrado</div>;
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">{ranking.title}</h1>
      <p className="text-softwhite/70">{ranking.description}</p>

      {ranking.products.map((product, index) => (
        <div
          key={index}
          className="border border-slate-800 rounded-xl p-6 hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">
            #{index + 1} – {product.title}
          </h2>

          <a
            href={product.link}
            target="_blank"
            rel="nofollow sponsored"
            className="mt-4 block w-max bg-primary text-background px-4 py-2 rounded-lg hover:scale-105 transition"
          >
            🔥 Ver na Amazon
          </a>
        </div>
      ))}
    </div>
  );
};

export default Ranking;
