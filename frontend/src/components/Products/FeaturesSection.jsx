import React from 'react'
import { HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi'
import { HiArrowPathRoundedSquare } from 'react-icons/hi2'

const FeaturesSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full'> <HiShoppingBag className='text-xl text-primary' /></div>
               
            <h3 className='text-lg font-semibold mb-2 uppercase'>Free International Shipping</h3>
            <p className='text-gray-600'>On orders over $3000</p>
        </div>
        <div className='flex flex-col items-center'>
            <div className='p-4 rounded-full'> <HiArrowPathRoundedSquare className='text-xl text-primary' /></div>
            <h3 className='text-lg font-semibold mb-2 uppercase'>45 Days Money Back Guarantee</h3>
            <p className='text-gray-600'>Money back guarantee</p>
        </div>
        <div className='flex flex-col items-center'>
            <div className='p-4 rounded-full mb-4'> <HiOutlineCreditCard className='text-xl text-primary' /></div>
            <h3 className='text-lg font-semibold mb-2 uppercase'>Secure Checkout</h3>
            <p className='text-gray-600'>Your payment information is secure with us.</p>
        </div>

        </div>
    </section>
  )
}

export default FeaturesSection