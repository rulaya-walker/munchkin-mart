import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import CartContents from '../Cart/CartContents'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCart } from '../../redux/slices/cartSlice';

const CartDrawer = ({ drawerOpen, toggleDrawer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, guestId} = useSelector((state) => state.auth);
    const cartState = useSelector((state) => state.cart);
    const cart = cartState.cart || cartState.products;
    const userId = user ? user._id : null;

    useEffect(() => {
        if (drawerOpen) {
            // Make sure we have a guestId for non-logged in users
            const effectiveGuestId = !userId && !guestId ? `guest_${Date.now()}` : guestId;
            
            dispatch(fetchCart({userId, guestId: effectiveGuestId}))
                .unwrap()
                .then(response => {
                    console.log("Cart fetched successfully", response);
                })
                .catch(error => {
                    console.error("Failed to fetch cart", error);
                    // Don't show error toast for network errors when fetching cart
                    // as it would be too intrusive
                });
        }
    }, [dispatch, drawerOpen, userId, guestId]);

    // Add debug logging for cart updates
    useEffect(() => {
        if (cartState.error) {
            //console.error("Cart error:", cartState.error);
        }
    }, [cartState.error]);

    const handleCheckout = () => {
        toggleDrawer(); // Close the drawer
        if(!user){
            navigate('/login?redirect=checkout'); // Navigate to login if user is not logged in
            return; // Stop further navigation
        }else{
            navigate('/checkout')
        }
    }
    return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
            {/* Close Button */}
            <div className='flex justify-end p-4'>
            <button onClick={toggleDrawer} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer">
                <IoMdClose className="h-6 w-6" />
            </button>
        </div>

        {/* Cart Content */}
        {cartState.loading ? (
            <div className="flex-1 flex items-center justify-center">
                <p>Loading cart...</p>
            </div>
        ) : cartState.error ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <p className="text-red-500 mb-2">Error loading cart</p>
                <p className="text-sm text-gray-500 text-center mb-4">{cartState.error}</p>
                <button 
                    onClick={() => dispatch(fetchCart({userId, guestId}))} 
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
                >
                    Retry
                </button>
            </div>
        ) : cartState.cart && cartState.cart.products && cartState.cart.products.length > 0 ? (
            <CartContents cart={cartState.cart} userId={userId} guestId={guestId} />
        ) : (
            <div className="flex-1 flex items-center justify-center">
                <p>Your cart is empty</p>
            </div>
        )}

        <div className='p-4 border-t border-gray-200'>
            {cartState.cart && cartState.cart.products && cartState.cart.products.length > 0 && (
                <>
                <button onClick={handleCheckout} className='w-full bg-primary text-white py-2 rounded cursor-pointer hover:bg-primary-dark'>
                Proceed to Checkout
            </button>
            <p className='text-sm text-center text-gray-500 tracking-tighter'>Shipping, taxes, and discounts will be calculated at checkout.</p>
                </>
                
            )}
        </div>
    </div>
  )
}

export default CartDrawer