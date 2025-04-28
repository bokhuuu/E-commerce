import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8">
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
