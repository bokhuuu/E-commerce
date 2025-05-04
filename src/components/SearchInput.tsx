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
        className="border px-3 py-2 rounded w-[130px] h-[25px]"
      />

      <button
        type="submit"
        className="text-xs text-white bg-black px-3 py-1 rounded"
      >
        Search
      </button>

      <button
        type="button"
        onClick={handleClear}
        className="text-xs text-white bg-black px-3 py-1 rounded "
      >
        Clear
      </button>
    </form>
  );
};

export default SearchInput;
