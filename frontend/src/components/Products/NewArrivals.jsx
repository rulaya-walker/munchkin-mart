import { use, useEffect, useRef, useState } from "react";
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";
import { axiosInstance } from "../../axios/axiosInstance";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
          try{
            const response = await axiosInstance.get("/api/products/new-arrivals");
            setProducts(response.data.products);
          }catch (error) {
            console.error("Error fetching new arrivals:", error);
          }
        };
        fetchNewArrivals();

    }, []);

    const handleMouseDown = (e) => {    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    };
const handleMouseLeave = () => {
    setIsDragging(false);
};
const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the multiplier for speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
};
const handleMouseUp = () => {
    setIsDragging(false);
    updateScrollButton();
};

const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
        const scrollAmount = direction === "left" ? -container.clientWidth : container.clientWidth;
        container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    }
  };
const updateScrollButton = () => {
    const container = scrollRef.current;
    if (container) {
        const scrollLeft = container.scrollLeft;
        const rightScrollable = container.scrollWidth > scrollLeft + container.clientWidth;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButton);
        updateScrollButton();
        return () => {
          container.removeEventListener("scroll", updateScrollButton);
        };
    }
}, [products]);
  return (
    <section id="newarrival" className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-gray-600 text-lg mb-14">
          Discover the latest additions to our collection, featuring trendy and
          stylish products for every occasion.
        </p>
        {/* Scroll Button */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
            <FaAngleLeft className="text-2xl" />
          </button>
          <button onClick={() => scroll("right")} disabled={!canScrollRight} className={`p-2 rounded border ${canScrollRight ? "bg-white text-black cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
            <FaAngleRight className="text-2xl" />
          </button>
        </div>
      </div>
      <div ref={scrollRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
        {products.map((product) => (
          <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
            <img
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              className="w-full h-[500px] object-cover rounded-lg" draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 background-blur-md p-4 text-white rounded-md">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="mt-1">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
