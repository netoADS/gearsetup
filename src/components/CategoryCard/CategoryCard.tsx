import { Link } from "react-router-dom"
import type { Category } from "../../data/categories"

interface Props {
  category: Category
}

const CategoryCard = ({ category }: Props) => {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition duration-300 group"
    >
      <div className="text-4xl mb-4">{category.icon}</div>

      <h3 className="text-xl font-semibold text-softwhite group-hover:text-primary transition">
        {category.name}
      </h3>

      <p className="text-softwhite/60 text-sm mt-2">
        {category.description}
      </p>
    </Link>
  )
}

export default CategoryCard
