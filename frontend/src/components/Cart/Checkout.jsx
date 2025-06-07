import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PaypalButton from "./PaypalButton";

const Checkout = () => {
    const navigate = useNavigate();
    const [checkoutId, setCheckoutId] = useState(null);
    const cart = {
        products: [
            {
                _id: 1,
                name: "Sample Product",
                price: 29.99,
                quantity: 2,
                size: "M",
                color: "Red",
                images: "https://picsum.photos/200/200?random=1"
            },
            {
                _id: 2,
                name: "Another Product",
                price: 19.99,
                quantity: 1,
                size: "L",
                color: "Blue",
                images: "https://picsum.photos/200/200?random=2"
            }
        ],
        total: 79.97,
    }
    const [shippingAddress, setShippingAddress] = useState({
        fName: "",
        lName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: ""
    });
    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        setCheckoutId(123); // Simulate checkout ID for demonstration
        // try {
        //     const response = await fetch('/api/checkout', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             cart,
        //             shippingAddress
        //         }),
        //     });

        //     if (!response.ok) {
        //         throw new Error('Failed to create checkout session');
        //     }

        //     const data = await response.json();
        //     setCheckoutId(data.checkoutId);
        //     navigate(`/checkout/${data.checkoutId}`);
        // } catch (error) {
        //     console.error('Error during checkout:', error);
        // }
    };
    const handlePaypalCheckout = () => {
        // Simulate PayPal checkout process
        console.log("Redirecting to PayPal for checkout...");
        // Here you would typically redirect to PayPal's payment page or integrate with their SDK
    };

    const handlePaymentSuccess = (details) => {
        console.log("Payment successful:", details);
        // Handle successful payment, e.g., update order status, redirect to confirmation page
        navigate('/order-confirmation');
    };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
        {/* Left Section  */}
       <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
            <form onClick={handleCreateCheckout} className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="block text-sm font-medium mb-2" htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="zip">ZIP Code</label>
                    <input
                        type="text"
                        id="zip"
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
                        <PaypalButton amount={100} onSuccess={handlePaymentSuccess} onError={(err)=>alert("Payment failed, try again")}/>
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
                            <img src={product.images} alt={product.name} className="w-16 h-16 object-cover rounded mr-4" />
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
            <div className="flex justify-between items-center border-t border-gray-300 pt-4">
                <span className="">Sub Total</span>
                <span className="">${cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg mt-4">
                <span className="">Shipping</span>
                <span className="">Free Shipping</span>
            </div>
            <div className="flex justify-between items-center text-lg border-t border-gray-300 mt-4 pt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">${cart.total.toFixed(2)}</span>
            </div>
       </div>
    </div>
  )
}

export default Checkout