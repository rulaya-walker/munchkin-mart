import React, { useState } from "react";
import logo from "../../assets/logo.png"; // Assuming you have a logo image
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2"; // Importing the hamburger menu icon
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <a href="/" className="text-lg font-semibold">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto mr-2 inline-block"
            />
          </a>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/collection/all"
            className="text-primary/90 uppercase text-sm hover:text-black"
          >
            Men
          </Link>
          <Link
            to="/collection/Women"
            className="text-primary/90 uppercase text-sm hover:text-black"
          >
            Women
          </Link>
          <Link
            to="/contact"
            className="text-primary/90 uppercase text-sm hover:text-black"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-primary/90 hover:text-black">
            <HiOutlineUser className="h-5 w-5 inline-block" />
          </Link>
          <button onClick={toggleDrawer} className="relative text-primary/90 hover:text-black cursor-pointer">
            <HiOutlineShoppingCart className="h-5 w-5 inline-block" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              0
            </span>
          </button>
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hidden text-primary/90 hover:text-black cursor-pointer">
            <HiBars3BottomRight className="h-5 w-5 inline-block md:hidden text-primary/90 hover:text-black" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg z-50 transition-transform transform duration-300 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        {/* Mobile Navigation Links */}
        <div className="px-4 mt-8">
          <h2 className="text-xl font-semibold text-gray-600">Menu</h2>
          <nav className="flex flex-col mt-4 space-y-">
            <Link
              to="/shop"
              className="text-primary/90 py-2 hover:text-secondary w-full "
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-primary/90 py-2 hover:text-secondary w-full"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-primary/90 py-2 hover:text-secondary w-full "
            >
              Contact
            </Link>
          </nav>
        </div>
        <button
          onClick={toggleNavDrawer}
          className="absolute top-4 right-4 text-primary/90 hover:text-black cursor-pointer"
        >
          <IoMdClose className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default Navbar;
