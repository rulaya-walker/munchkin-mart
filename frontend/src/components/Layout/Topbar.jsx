import React from 'react'
import { TbBrandMeta } from 'react-icons/tb'
import { TbBrandInstagram } from 'react-icons/tb'
import { TbBrandFacebook } from 'react-icons/tb'

const Topbar = () => {
  return (
    <div className='bg-primary text-white'>
        <div className='container mx-auto flex justify-between items-center py-2 px-4'>
            <div className='hidden md:flex items-center py-2'>
                <a href='#' className='hover:text-gray-300'><TbBrandMeta className="h-5 w-5" /></a>
                <a href='#' className='hover:text-gray-300'><TbBrandInstagram className="h-5 w-5" /></a>
                <a href='#' className='hover:text-gray-300'><TbBrandFacebook className="h-5 w-5" /></a>
            </div>
            <div className='text-sm text-center flex-grow'>
                <span>We ship worldwide - Fast and reliable delivery</span>
            </div>
            <div className='hidden md:block text-sm text-center'>
                <a href='tel:+9779841076394' className='hover:text-gray-300'>+9779841076394</a>
            </div>
        </div>
    </div>
  )
}

export default Topbar