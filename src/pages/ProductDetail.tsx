import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

const ProductDetail = () => {
  const { productId } = useParams();
  const { data, isLoading, isError } = useProduct(productId!);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Product not found</div>;

  return (
    <div className="py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <img
          src={data.avatar}
          alt={data.name}
          className="rounded-lg w-full h-auto"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
          <p className="text-gray-600 mb-4">{data.description}</p>
          <div className="text-2xl font-semibold text-primary">
            ${data.price}
          </div>
          <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
