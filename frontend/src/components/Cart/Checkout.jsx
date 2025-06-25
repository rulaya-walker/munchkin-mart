import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import { toast } from "sonner";
import { axiosTokenInstance } from "../../axios/axiosInstance";

const Checkout = () => {
    const navigate = useNavigate();
    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        fName: '',
        lName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: ''
    });
   const dispatch = useDispatch();
   const {cart,loading,error} = useSelector((state) => state.cart);
   const {user} = useSelector((state) => state.auth);
   //Ensure cart is loaded before proceeding and user is logged in
   useEffect(() => {
        // Check if cart has items
        if(!cart || !cart.products || cart.products.length === 0) {
            navigate('/');
        }
    }, [cart, navigate]);

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.state || 
            !shippingAddress.zip || !shippingAddress.country || !shippingAddress.phone) {
            toast.error("Please fill in all required shipping information");
            return;
        }
        
        if(cart && cart.products.length > 0) {
            try {
                const res = await dispatch(createCheckout({
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: 'PayPal',
                    totalPrice: cart.totalPrice 
                })).unwrap();

                if (res && res._id) {
                    setCheckoutId(res._id);
                    toast.success("Checkout created successfully");
                }
            } catch (error) {
                console.error("Checkout creation failed:", error);
                toast.error(error.message || "Failed to create checkout. Please try again.");
            }
        } else {
            toast.error("Your cart is empty. Add items to proceed.");
        }
    };

    const handlePaymentSuccess = async (details) => {
        // Handle successful payment, e.g., update order status, redirect to confirmation page
        try {
            
            if (!checkoutId) {
                toast.error("Checkout ID is missing. Please try again.");
                return;
            }
            
            const response = await axiosTokenInstance.put(`/api/checkout/${checkoutId}/pay`, {
                paymentStatus: 'Paid',
                paymentDetails: details,
            });
            
     
        await handleFinalizeCheckout(checkoutId);
   
        } catch (error) {
            console.error("Payment processing failed:", error.response?.data || error.message);
            toast.error("Payment processing failed. Please try again.");
            return;
        }
    };

    const handleFinalizeCheckout = async (checkoutId) => {
        try {  
            if (!checkoutId) {
                toast.error("Checkout ID is missing. Cannot finalize checkout.");
                return false;
            }
            
            const response = await axiosTokenInstance.post(`/api/checkout/${checkoutId}/finalize`, {
                shippingAddress,
                paymentMethod: 'PayPal',
                totalPrice: cart.totalPrice,
            });
            
                navigate('/order-confirmation');
   
        } catch (error) {
            console.error("Error finalizing checkout:", error.response?.data || error.message);
            toast.error("Error finalizing checkout. Please try again.");
            return false;
        }
    };

if(loading) {
    return <div className="text-center text-gray-700">Loading checkout...</div>;
}
if(error) {
    return <div className="text-center text-red-500">Error loading checkout: {error}</div>;
}
if(!cart || !cart.products || cart.products.length === 0) {
    return <div className="text-center text-gray-700">Your cart is empty. Please add items to your cart before proceeding to checkout.</div>;
}
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
        {/* Left Section  */}
       <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
            <form onSubmit={handleCreateCheckout} className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" htmlFor="address">Address</label>
                    <input
                        type="email"
                        value={user? user.email :""}
                        className="border border-gray-300 p-2 rounded-lg w-full" disabled
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="fname">First Name</label>
                    <input
                        type="text"
                        id="fname"
                        value={shippingAddress.fName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, fName: e.target.value })}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="lname">Last Name</label>
                    <input
                        type="text"
                        id="lname"
                        value={shippingAddress.lName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, lName: e.target.value })}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" htmlFor="address">Address <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="address"
                        required
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="city">City <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="city"
                        required
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="state">State <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="state"
                        required
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="zip">ZIP Code <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="zip"
                        required
                        value={shippingAddress.zip}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                </div>
                
            </div>
            <div className="mb-4 mt-4">
                <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone Number</label>
                <input
                    type="text"
                    id="phone"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="border border-gray-300 p-2 rounded-lg w-full"
                />
            </div>
            <div className="mt-6">
                {!checkoutId ? <button type="submit" className='w-full bg-primary text-white py-2 rounded cursor-pointer hover:bg-primary-dark'>
                    Proceed to Checkout
                </button> : (
                    <div>
                       <h3 className="text-2xl mb-2">Pay with Paypal</h3>
                        <PaypalButton 
                            amount={cart.totalPrice} 
                            onSuccess={handlePaymentSuccess} 
                            onError={(err) => {
                                console.error("PayPal payment error:", err);
                                toast.error("Payment failed. Please try again.");
                            }}
                        />
                    </div>
                )}
            </div>
            </form>
       </div>
       <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg mb-4 font-semibold">Order Summary</h3>
            <div className="border-t border-gray-300 py-4 mb-4">
                {cart.products.map((product) => (
                    <div key={product._id} className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded mr-4" />
                            <div>
                                <h4 className="text-sm font-medium">{product.name}</h4>
                                <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                                <p className="text-sm text-gray-600">Size: {product.size}</p>
                                <p className="text-sm text-gray-600">Color: {product.color}</p>
                            </div>
                        </div>
                        <span className="text-sm font-semibold">${(product.price * product.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center text-lg mt-4">
                <span className="">Sub Total</span>
                <span className="">${cart.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg mt-4">
                <span className="">Shipping</span>
                <span className="">Free Shipping</span>
            </div>
            <div className="flex justify-between items-center text-lg border-t border-gray-300 mt-4 pt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">${cart.totalPrice.toFixed(2)}</span>
            </div>
       </div>
    </div>
  )
}

export default Checkout