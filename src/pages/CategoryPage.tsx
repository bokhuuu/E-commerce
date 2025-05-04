import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  const [color, setColor] = useState<string>();
  const [sortBy, setSortBy] = useState<"price" | "rating">("price");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data: products, isLoading } = useFilteredProducts({
    name: query,
    color,
    sortBy,
    order,
    limit: 30,
    page: 1,
  });

  const availableColors = useMemo(() => {
    const colors = products?.map((p) => p.color).filter(Boolean);
    return Array.from(new Set(colors));
  }, [products]);

  const handleClearFilters = () => {
    setColor(undefined);
    setSortBy("price");
    setOrder("asc");
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Filter Products</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        {availableColors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-6 h-6 rounded-full border-2 ${
              c === color ? "border-black" : "border-transparent"
            }`}
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "price" | "rating")}
          className="text-xs text-white bg-black px-3 py-1 rounded"
        >
          <option value="price">By Price</option>
          <option value="rating">By Rating</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
          className="text-xs text-white bg-black px-3 py-1 rounded"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        <button
          onClick={handleClearFilters}
          className="text-xs text-white bg-black px-3 py-1 rounded"
        >
          Clear
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
