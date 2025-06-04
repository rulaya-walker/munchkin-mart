import React from 'react'
import { Link } from 'react-router-dom'
import featured from '../../assets/featured.webp' // Assuming you have a featured image

const FeaturesCollection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col-reverse items-center lg:flex-row bg-green-50 rounded-3xl'>
            <div className='lg:w-1/2 p-8 text-center lg:text-left'>
            <p className='text-lg font-semibold text-gray-700 mb-2'>Custom Style</p>
                <h2 className='text-4xl font-semibold mb-4 text-gray-800'>Why Choose Us?</h2>
                <p className='text-gray-600 mb-6'>
                    At Munchkin Mart, we are dedicated to providing the best products for your little ones. Our collection is carefully curated to ensure quality, safety, and style.
                </p>
                <Link to='/shop' className='mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors'>
                    Shop Now
                </Link>
            </div>
            <div className='lg:w-1/2'>
                <img src={featured} alt="Features" className='w-full h-auto rounded-lg shadow-lg' />

            </div>
        </div>
    </section>
  )
}

export default FeaturesCollection   