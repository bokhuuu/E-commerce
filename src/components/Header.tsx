import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import SearchInput from "./SearchInput";
import shopLogo from "../assets/SHOP.CO.png";

const Header = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="w-full mt-2 shadow-md">
      <div className="bg-black h-[38px] flex justify-center items-center text-white text-sm mb-2">
        <Link to="/signup" className="hover:underline">
          Sign Up
        </Link>
      </div>

      <div className="max-w-[1240px] mx-auto h-[48px] px-4 flex items-center justify-between">
        <div className="lg:hidden">
          <button onClick={() => setShowMobileMenu(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <Link to="/products">
          <img src={shopLogo} alt="SHOP.CO" className="h-5 sm:h-8 w-[100px]" />
        </Link>

        <div className="hidden lg:flex items-center justify-between w-full gap-10">
          <nav className="flex gap-10 text-sm font-medium mx-auto">
            <Link to="/products">Products</Link>
            <Link to="/category">Category</Link>
            <Link to="/feedbacks">Feedbacks</Link>
          </nav>

          <div className="flex items-center gap-4">
            <SearchInput />
            <Link to="/cart">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <Link to="/login">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>

        <div className="lg:hidden flex gap-4 items-center">
          <button onClick={() => setShowMobileSearch(!showMobileSearch)}>
            <Search className="w-6 h-6" />
          </button>
          <Link to="/cart">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          <Link to="/login">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {showMobileSearch && (
        <div className="px-4 py-2 lg:hidden">
          <SearchInput />
        </div>
      )}

      {showMobileMenu && (
        <div className="fixed inset-0 bg-white z-50 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <img src={shopLogo} alt="SHOP.CO" className="h-6 w-auto" />
            <button onClick={() => setShowMobileMenu(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-lg font-medium">
            <Link to="/products" onClick={() => setShowMobileMenu(false)}>
              Products
            </Link>
            <Link to="/category" onClick={() => setShowMobileMenu(false)}>
              Category
            </Link>
            <Link to="/feedbacks" onClick={() => setShowMobileMenu(false)}>
              Feedbacks
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
