import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturesCollection from "../components/Products/FeaturesCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import {useDispatch, useSelector} from "react-redux";
import { axiosInstance } from "../axios/axiosInstance";
import { fetchProductsByCollection } from "../redux/slices/productSlice";
const Home = () => {
  const dispatch = useDispatch();
  const {products,loading,error} = useSelector((state) => state.products);
  const [bestSellerProduct,setBestSellerProduct] = useState(null);
  useEffect(() => {
        dispatch(fetchProductsByCollection({
        gender:"Women",
        category: "Bottom Wear",
        limit: 8,
      }));
    const fetchBestSellers = async () => {
      try {
        const response = await axiosInstance.get('/api/products/best-selling');
        const data = await response.data.product;
        setBestSellerProduct(data);
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      }
    };
    fetchBestSellers();
  }, [dispatch]);
  //console.log("Products:", products);

  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      <h2 className="text-center text-3xl font-bold mb-8 text-gray-700">
        Best Sellers
      </h2>
      {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (<p className="text-center">Loading best seller product</p>)}
      <div className="container mx-auto ">
        <h2 className="text-3xl text-capitalize text-center font-semibold text-gray-700 mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturesCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
