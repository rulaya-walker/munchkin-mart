import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: 2,
          name: "Placeholder Product 1",
          price: 24.99,
          images: [
            {
              url: "https://picsum.photos/200/200?random=1",
              alt: "Product Image 1",
            },
          ],
        },
        {
          _id: 3,
          name: "Placeholder Product 2",
          price: 34.99,
          images: [
            {
              url: "https://picsum.photos/200/200?random=2",
              alt: "Product Image 2",
            },
          ],
        },
        {
          _id: 4,
          name: "Placeholder Product 3",
          price: 19.99,
          images: [
            {
              url: "https://picsum.photos/200/200?random=3",
              alt: "Product Image 3",
            },
          ],
        },
        {
          _id: 5,
          name: "Placeholder Product 4",
          price: 39.99,
          images: [
            {
              url: "https://picsum.photos/200/200?random=4",
              alt: "Product Image 4",
            },
          ],
        },
        {
          _id: 6,
          name: "Placeholder Product 5",
          price: 29.99,
          images: [
            {
              url: "https://picsum.photos/200/200?random=5",
              alt: "Product Image 5",
            },
          ],
        },
        {
          _id: 7,
          name: "Placeholder Product 6",
          price: 49.99,
          images: [
            {
              url: "https://picsum.photos/200/200?random=6",
              alt: "Product Image 6",
            },
          ],
        },
        {
          _id: 8,
          name: "Placeholder Product 7",
          price: 59.99,
          images: [
            {
              url: "https://picsum.photos/200/200?random=7",
              alt: "Product Image 7",
            },
          ],
        },
        {
          _id: 9,
          name: "Placeholder Product 8",
          price: 69.99,
          images: [
            {
              url: "https://picsum.photos/200/200?random=8",
              alt: "Product Image 8",
            },
          ],
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);

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
        <ProductGrid products={products} />
    </div>
  </div>;
};

export default Collection;
