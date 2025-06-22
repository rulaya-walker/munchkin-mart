import React, { use, useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCollection } from "../redux/slices/productSlice";

const Collection = () => {
  const {collection} = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByCollection({
      collection,
      ...queryParams,
    }));
  }, [dispatch, collection, searchParams]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
  },[]);
  return <div className="flex flex-col lg:flex-row">
    {/* Mobile Filter Button */}
    <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center cursor-pointer">
        <FaFilter className="mr-2" />
    </button>
    {/* Filter Sidebar */}
    <div ref={sidebarRef} className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg overflow-y-auto lg:static lg:translate-x-0 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <FilterSidebar />
    </div>
    <div className="flex-grow p-4 lg:p-6">
      <h2 className="text-2xl font-bold mb-4 uppercase">Product Collection</h2>
      {/* Sort Options */}
      <SortOptions />
        {/* Product Grid */}    
        <ProductGrid products={products} loading={loading} error={error} />
    </div>
  </div>;
};

export default Collection;
