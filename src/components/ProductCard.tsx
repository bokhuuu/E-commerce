import { Product } from "../types/product";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="w-[295px] h-[310px] border rounded-lg p-4">
        <img
          src={product.avatar}
          alt={product.name}
          className="w-[295px] h-[198px] object-cover rounded-[20px] mx-auto"
        />
        <h2 className="mt-4 font-bold text-[18px]">{product.name}</h2>
        <div className="mt-2 font-bold text-[24px]">${product.price}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
