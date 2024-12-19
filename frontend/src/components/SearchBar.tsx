import { useState } from "react";
import Search from "../assets/search.svg?react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") navigate(`/search?q=${query}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-2 border-core-main px-2 rounded-full group"
    >
      <button>
        <Search className="stroke-core-main" />
      </button>
      <input
        placeholder="Search"
        value={query}
        maxLength={20}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent text-sm p-2 font-medium text-core-main placeholder:text-core-main group-hover:pr-8 transition-all"
      />
    </form>
  );
};

export default SearchBar;
