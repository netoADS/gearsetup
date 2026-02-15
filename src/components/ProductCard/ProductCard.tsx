import { Link } from "react-router-dom"
import type { Product } from "../../types/Product/Product"

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition duration-300 block"
    >
      <img
        src={product.image}
        alt={product.title}
        className="rounded-lg mb-4 w-full h-48 object-cover"
      />

      <h3 className="text-xl font-semibold text-softwhite mb-2">
        {product.title}
      </h3>

      <p className="text-softwhite/60 text-sm line-clamp-3">
        {product.description}
      </p>
    </Link>
  )
}

export default ProductCard
