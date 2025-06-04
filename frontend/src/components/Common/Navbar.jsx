import React from "react";
import logo from "../../assets/logo.png"; // Assuming you have a logo image
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2"; // Importing the hamburger menu icon

const Navbar = () => {
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
            to="/shop"
            className="text-primary/90 uppercase text-sm hover:text-black"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="text-primary/90 uppercase text-sm hover:text-black"
          >
            About
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
          <button className="relative text-primary/90 hover:text-black cursor-pointer">
            <HiOutlineShoppingCart className="h-5 w-5 inline-block" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              0
              </span>
          </button>
          {/*Search */}
          <button className="md:hidden text-primary/90 hover:text-black cursor-pointer">
            <HiBars3BottomRight className="h-5 w-5 inline-block md:hidden text-primary/90 hover:text-black" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
