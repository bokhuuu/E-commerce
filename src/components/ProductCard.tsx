import { Product } from "../types/product";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <img
          src={product.avatar}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="mt-2 font-bold text-primary">${product.price}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
