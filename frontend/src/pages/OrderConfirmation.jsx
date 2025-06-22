import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);
  console.log("Checkout data:", checkout._id);

  // Clear cart 
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders"); // Redirect to orders page if no checkout data
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    if (!createdAt) return "N/A";
    try {
      const deliveryDate = new Date(createdAt);
      deliveryDate.setDate(deliveryDate.getDate() + 7); // Assuming 7 days for delivery
      return deliveryDate.toLocaleDateString();
    } catch (error) {
      console.error("Error calculating delivery date:", error);
      return "N/A";
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-bold mb-6 text-emerald-700 bg-white">
        Thank you for your order!
      </h1>
      {checkout && checkout._id ? (
        <div className="p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-20">
            <div>
              <p className="text-gray-600 mb-4">
                Your order ID is:{" "}
                <span className="font-semibold">{checkout._id}</span>
              </p>
              <p className="text-gray-600 mb-4">
                Order Date:{" "}
                <span className="font-semibold">
                  {checkout.createdAt ? new Date(checkout.createdAt).toLocaleDateString() : "N/A"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-emerald-700">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          <div className="mb-20">
            {checkout.checkoutItems && checkout.checkoutItems.length > 0 ? (
              checkout.checkoutItems.map((item, index) => (
                <div key={index} className="flex items-center mb-6">
                  <img
                    src={item.product?.images?.[0]?.url || "/munch.png"}
                    alt={item.product?.images?.[0]?.alt || item.product?.name || "Product image"}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.product?.name || "Product"}
                    </h2>
                    <p className="text-gray-600">Size: {item.size || "N/A"}</p>
                    <p className="text-gray-600">Color: {item.color || "N/A"}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-gray-600">
                      Price: ${item.product?.price ? item.product.price.toFixed(2) : "0.00"}
                    </p>
                    <p className="text-gray-600">Quantity: {item.quantity || 0}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No items in this order</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment </h2>
                <p className="text-gray-600">Payment Method: PayPal</p>
                <p className="text-gray-600">Status: {checkout.status || "N/A"}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Shipping Address
              </h2>
              {checkout.shippingAddress ? (
                <>
                  <p className="text-gray-600">
                    {checkout.shippingAddress.fName || ""} {checkout.shippingAddress.lName || ""}
                  </p>
                  <p className="text-gray-600">{checkout.shippingAddress.address || ""}</p>
                  <p className="text-gray-600">
                    {checkout.shippingAddress.city || ""}, {checkout.shippingAddress.state || ""}{" "}
                    {checkout.shippingAddress.zip || ""}
                  </p>
                  <p className="text-gray-600">{checkout.shippingAddress.country || ""}</p>
                  <p className="text-gray-600">
                    Phone: {checkout.shippingAddress.phone || "N/A"}
                  </p>
                </>
              ) : (
                <p className="text-gray-600">No shipping address available</p>
              )}
            </div>
          </div>
          <div className="text-center mt-10 border-t border-gray-300 pt-6">
            <p className="text-gray-600">Thank you for shopping with us!</p>
            <p className="text-gray-600">We appreciate your business.</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No order information available.</p>
          <button 
            onClick={() => navigate('/my-orders')} 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
          >
            View My Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
