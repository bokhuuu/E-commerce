import { BrowserRouter, Routes, Route } from "react-router";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
