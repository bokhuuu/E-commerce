import { Link, useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useCartStore } from "../store/useCartStore";
import { useFeedbacksByProduct } from "../hooks/useFeedbacksByProduct";

const ProductDetail = () => {
  const { productId } = useParams();
  const { data: product, isLoading, isError } = useProduct(productId!);
  const { data: feedbacks, isLoading: loadingFeedbacks } =
    useFeedbacksByProduct(Number(productId));
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  const addToCart = () => {
    if (!product) return;
    addItem(product);
    navigate("/cart");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Product not found</div>;

  return (
    <div className="py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start mb-8">
        <img
          src={product.avatar}
          alt={product.name}
          className="rounded-lg w-full h-[400px]"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <span className="text-gray-600">color: {product.color}</span>
          <div className="text-2xl font-semibold text-primary mt-4">
            ${product.price}
          </div>

          <button
            onClick={addToCart}
            className="mt-4 bg-black text-white px-6 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <Link
        to={`/products/${productId}/feedback`}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Write a Review
      </Link>

      <div className="mt-10 ">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {loadingFeedbacks ? (
          <p>Loading reviews...</p>
        ) : feedbacks && feedbacks.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
