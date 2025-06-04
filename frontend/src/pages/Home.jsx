import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturesCollection from "../components/Products/FeaturesCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
const placeholderProducts = [
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
const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      <h2 className="text-center text-3xl font-bold mb-8 text-gray-700">
        Best Sellers
      </h2>
      <ProductDetails />
      <div className="container mx-auto ">
        <h2 className="text-3xl text-capitalize text-center font-semibold text-gray-700 mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <FeaturesCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
