import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(
        `${location.pathname}?query=${encodeURIComponent(search.trim())}`
      );
      setSearch("");
    }
  };

  const handleClear = () => {
    setSearch("");
    navigate(location.pathname);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="border px-3 py-2 rounded"
      />

      <button
        type="button"
        onClick={handleClear}
        className="text-sm text-white bg-black px-3 py-1 rounded"
      >
        Clear
      </button>

      <button
        type="submit"
        className="text-sm text-white bg-black px-3 py-1 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
