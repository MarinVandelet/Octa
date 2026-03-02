import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const cover = product.images?.[0] || product.image;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-neutral-900/40 rounded-2xl overflow-hidden border border-neutral-800"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[4/5] bg-neutral-900">
          <img src={cover} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-4">
          <div className="text-xs text-neutral-400">{product.category}</div>
          <div className="mt-1 flex items-start justify-between gap-4">
            <h3 className="font-semibold leading-snug">{product.name}</h3>
            <div className="font-semibold">{product.price}€</div>
          </div>
          <div className="mt-2 text-sm text-neutral-400 line-clamp-2">
            {product.description}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
