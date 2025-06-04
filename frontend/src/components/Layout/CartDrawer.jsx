import { IoMdClose } from 'react-icons/io'
import CartContents from '../Cart/CartContents'

const CartDrawer = ({ drawerOpen, toggleDrawer }) => {
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Close Button */}
        <div className='flex justify-end p-4'>
            <button onClick={toggleDrawer} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer">
                <IoMdClose className="h-6 w-6" />
            </button>
        </div>

        {/* Cart Content */}
        <CartContents />
        <div className='p-4 border-t border-gray-200'>
            <button className='w-full bg-primary text-white py-2 rounded hover:bg-primary-dark'>
                Proceed to Checkout
            </button>
            <p className='text-sm text-center text-gray-500 tracking-tighter'>Shipping, taxes, and discounts will be calculated at checkout.</p>
        </div>
    </div>
  )
}

export default CartDrawer