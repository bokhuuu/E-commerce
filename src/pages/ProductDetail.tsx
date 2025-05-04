import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useCartStore } from "../store/useCartStore";
import { useFeedbacksByProduct } from "../hooks/useFeedbacksByProduct";

const ProductDetail = () => {
  const { productId } = useParams();
  const { data: product, isLoading, isError } = useProduct(productId!);
  const { data: feedbacks, isLoading: loadingFeedbacks } =
    useFeedbacksByProduct(Number(productId));
  const addItem = useCartStore((state) => state.addItem);

  const addToCart = () => {
    if (!product) return;
    addItem(product);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Product not found</div>;

  return (
    <div className="py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <img
          src={product.avatar}
          alt={product.name}
          className="rounded-lg w-full h-auto"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <span>{product.color}</span>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-2xl font-semibold text-primary">
            ${product.price}
          </div>
          <button
            onClick={addToCart}
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <Link
        to={`/products/${productId}/feedback`}
        className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Write a Review
      </Link>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {loadingFeedbacks ? (
          <p>Loading reviews...</p>
        ) : feedbacks && feedbacks.length ? (
          <div className="space-y-4">
            {feedbacks.map((f) => (
              <div key={f.id} className="border p-4 rounded">
                <div className="flex justify-between mb-1">
                  <strong>{f.name}</strong>
                  <div className="text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i}>{i <= (f.rating || 0) ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{f.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
