import { BrowserRouter, Routes, Route } from "react-router";
import Products from "../pages/Products";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
