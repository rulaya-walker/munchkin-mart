import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../redux/slices/cartSlice";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { checkout } = useSelector((state) => state.checkout);


 // Clear Cart
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(resetCart());
      localStorage.removeItem('cart');
    }else{
      navigate('/my-orders');
    }
  }, [checkout, dispatch,navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const deliveryDate = new Date(createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 7); // Assuming 7 days for delivery
    return deliveryDate.toLocaleDateString();
  };
  

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-bold mb-6 text-emerald-700 bg-white">
        Thank you for your order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-20">
            <div>
              <p className="text-gray-600 mb-4">
                Your order ID is:
                <span className="font-semibold">{checkout._id}</span>
              </p>
              <p className="text-gray-600 mb-4">
                Order Date:
                <span className="font-semibold">
                  {new Date(checkout.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
            <div>
              <p className="text-emerald-700">
                Estimated Delivery :
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          <div className="mb-20">
            {checkout.checkoutItems.map((item, index) => (
              <div key={index} className="flex items-center mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>

                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Color: {item.color}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-gray-600">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment</h2>
              <p className="text-gray-600">Payment Method: {checkout.paymentMethod}</p>
            </div>
           <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Shipping Address
            </h2>
            {/* <p className="text-gray-600">
              {checkout.shippingAddress.fName} {checkout.shippingAddress.lName}
            </p> */}
            <p className="text-gray-600">{checkout.shippingAddress.address}</p>
            <p className="text-gray-600">
              {checkout.shippingAddress.city}, {checkout.shippingAddress.state}{" "}
              {checkout.shippingAddress.zip}
            </p>
            <p className="text-gray-600">{checkout.shippingAddress.country}</p>
            {/* <p className="text-gray-600">
              Phone: {checkout.shippingAddress.phone}
            </p> */}
          </div>
          </div>
          <div className="text-center mt-10 border-t border-gray-300 pt-6">
            <p className="text-gray-600">Thank you for shopping with us!</p>
            <p className="text-gray-600">We appreciate your business.</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderConfirmation;