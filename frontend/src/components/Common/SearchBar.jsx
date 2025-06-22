import { use, useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByCollection, setFilters } from "../../redux/slices/productSlice";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      // Perform search logic here, e.g., redirect to search results page
     dispatch(setFilters({
        search: searchTerm,}));
      dispatch(fetchProductsByCollection({search: searchTerm}));
      navigate(`/collection/all?search=${searchTerm}`);
      // Reset search term after search
      setSearchTerm("");
      setIsOpen(false);
    }
  };
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
      {/* Button to toggle search bar */}
    
      {!isOpen ? ( <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer text-primary/90 hover:text-black"
      >
        <HiMagnifyingGlass className="h-5 w-5 inline-block" />
      </button>): (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none w-full"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary/90 hover:text-black cursor-pointer"
            >
              <HiMagnifyingGlass className="h-5 w-5 inline-block" />
            </button>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-primary/90 hover:text-black cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2">
            <HiMiniXMark className="h-5 w-5 inline-block" />
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
