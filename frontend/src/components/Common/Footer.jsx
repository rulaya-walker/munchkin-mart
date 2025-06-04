import React from 'react'
import { TbBrandInstagram } from 'react-icons/tb'
import { TbBrandFacebook } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { FiPhoneCall } from 'react-icons/fi'
import { FaLocationDot } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t border-gray-200 bg-white'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-8 px-4'>
          <div>
            <h5 className='font-semibold mb-4'>About Us</h5>
            <p className='text-sm text-gray-600'>
              Munchkin Mart is a thoughtfully curated online marketplace dedicated to providing high-quality products for babies and toddlers. 
            </p>
            <p className='font-medium text-sm text-gray-500'>Signup for our newsletter to receive the latest updates and offers!</p>
            <form className='flex'>
                <input 
                    type='email' 
                    placeholder='Enter your email' 
                    className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all required:'
                />
                <button 
                    type='submit' 
                    className='bg-primary text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'
                >
                    Subscribe
                </button>
            </form>
          </div>
          <div>
            <h5 className='font-semibold mb-4 text-gray-800'>Shop</h5>
            <ul className='text-sm text-gray-600'>
              <li><Link to='/shop'>Shop All</Link></li>
              <li><Link to='/contact'>Baby's Top Wear</Link></li>
              <li><Link to='/returns'>Shoes</Link></li>
              <li><Link to='/returns'>Clothes</Link></li>
            </ul>
          </div>
          <div>
            <h5 className='font-semibold mb-4 text-gray-800'>Customer Service</h5>
            <ul className='text-sm text-gray-600'>
              <li><Link to='/faq'>FAQ</Link></li>
              <li><Link to='/contact'>Contact Us</Link></li>
              <li><Link to='/returns'>Returns</Link></li>
              <li><Link to='/privacy'>Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h5 className='font-semibold mt-4'>Call Us</h5>
            <p className='text-sm text-gray-600'><Link to='tel:+9779841076394'><FiPhoneCall className='inline-block'/> +9779841076394</Link></p>
            <p className='text-sm text-gray-600'><FaLocationDot className='inline-block'/> Kathmandu, Nepal</p>
            <p className='text-sm text-gray-600'><FaEnvelope className='inline-block'/> <Link to='mailto:info@munchkinmart.com'>info@munchkinmart.com</Link></p>
            <h5 className='font-semibold mb-4 mt-4'>Follow Us</h5>
            <ul className='flex space-x-4'>
              <li><Link to='/facebook' className='text-gray-600 hover:text-gray-800'><TbBrandFacebook/></Link></li>
              <li><Link to='/instagram' className='text-gray-600 hover:text-gray-800'><TbBrandInstagram/></Link></li>
            </ul>
            
          </div>
        </div>
      <div className='container mx-auto py-4'>
        <p className='text-center text-gray-600'>
          &copy; {new Date().getFullYear()} Munchkin Mart. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer