import { useLocation } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useFilteredProducts } from "../hooks/useFilteredProducts";

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  const filters = {
    name: query,
  };

  const { data: products, isLoading, isError } = useFilteredProducts(filters);
  const [visibleCount, setVisibleCount] = useState(8);

  if (isLoading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-600 font-medium">
        Something went wrong
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">No products matched</div>
    );
  }

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="text-center mb-8">
          <button
            onClick={() => setVisibleCount(visibleCount + 8)}
            className="bg-black text-white text-sm px-6 py-2 rounded"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
