import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import CategoryPage from "../pages/CategoryPage";
import Cart from "../pages/Cart";
import Feedbacks from "../pages/Feedbacks";
import SubmitFeedbackPage from "../pages/SubmitFeedback";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />

        <Route path="/category" element={<CategoryPage />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route
          path="/products/:productId/feedback"
          element={<SubmitFeedbackPage />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
