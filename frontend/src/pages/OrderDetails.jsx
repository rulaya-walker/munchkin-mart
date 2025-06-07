import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom';

const OrderDetails = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    // Simulate fetching order details
    useEffect(() => {
        const fetchOrderDetails = async () => {
            // const response = await fetch(`/api/orders/${id}`);
            // const data = await response.json();
            const mockOrderDetails = {
                _id: id,
                createdAt: new Date(),
                isPaid: true,
                isDelivered: false,
                paymentMethod:"Paypal",
                shippingMethod: "Standard Shipping",
                status: "COMPLETED",
                checkoutItems: [
                    {
                        product: {
                            _id: 1,
                            name: "Sample Product",
                            price: 29.99,
                            images: [
                                { url: "https://picsum.photos/200/200?random=1", alt: "Sample Product Image" }
                            ],
                        },
                        quantity: 2,
                        size: "M",
                        color: "Red",
                    },
                    {
                        product: {
                            _id: 2,
                            name: "Another Product",
                            price: 19.99,
                            images: [
                                { url: "https://picsum.photos/200/200?random=2", alt: "Another Product Image" }
                            ],
                        },
                        quantity: 1,
                        size: "L",
                        color: "Blue",
                    },
                ],
                shippingAddress: {
                    fName: "John",
                    lName: "Doe",
                    address: "123 Main St",
                    city: "Anytown",
                    state: "CA",
                    zip: "12345",
                    country: "USA",
                    phone: "123-456-7890",
                },
            };
            setOrderDetails(mockOrderDetails);
        };
        fetchOrderDetails();
    }, [id]);

  return (
    <div className='max-4-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
        {!orderDetails ? (
            <p className='text-gray-500'>Loading order details...</p>
        ) : (
            <div className='p-4 sm:p-6 rounded-lg border border-gray-300'>
                {/* Order Info */}
                <div className='flex flex-col sm:flex-row justify-between mb-8'>
                    <div>
                        <h3 className='text-lg md:text-xl font-semibold'>Order ID: #{orderDetails._id}</h3>
                        <p className='text-gray-600'>Order Date: {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                    </div>

                <div className='flex flex-col items-center sm:items-end mt-4 sm:mt-0'>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${orderDetails.isPaid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{orderDetails.isPaid ? "Paid" : "Pending"}</span>
                    <span className={`text-sm font-medium px-3 py-1 mt-2 rounded-full ${orderDetails.isDelivered ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>{orderDetails.isDelivered ? "Delivered" : "Not Delivered"}</span>
                </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Payment Information</h4>
                        <p className='text-gray-600'>Payment Method: {orderDetails.paymentMethod}</p>
                        <p className='text-gray-600'>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                    </div>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Shipping Information</h4>
                        <p className='text-gray-600'>Shipping Method: {orderDetails.shippingMethod}</p>
                        <p className='text-gray-600'>Address: {orderDetails.shippingAddress.fName} {orderDetails.shippingAddress.lName}, {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}, {orderDetails.shippingAddress.zip}, {orderDetails.shippingAddress.country}</p>
                        <p className='text-gray-600'>Phone: {orderDetails.shippingAddress.phone}</p>
                    </div>
                </div>
                <div className='overflow-x-auto'>
                    <h4 className='text-lg font-semibold mb-4'>Products</h4>
                    <table className='min-w-full bg-white border border-gray-300'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='px-4 py-2 text-left'>Product</th>
                                <th className='px-4 py-2 text-left'>Quantity</th>
                                <th className='px-4 py-2 text-left'>Size</th>
                                <th className='px-4 py-2 text-left'>Color</th>
                                <th className='px-4 py-2 text-right'>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.checkoutItems.map((item, index) => (
                                <tr key={index} className='border-b'>
                                    <td className='px-4 py-2 flex items-center'>
                                        <img src={item.product.images[0].url} alt={item.product.images[0].alt} className='w-12 h-12 mr-4 object-cover' />
                                        <Link to={`/product/${item.product._id}`} className='text-blue-600 hover:underline'>{item.product.name}</Link>
                                    </td>
                                    <td className='px-4 py-2'>{item.quantity}</td>
                                    <td className='px-4 py-2'>{item.size}</td>
                                    <td className='px-4 py-2'>{item.color}</td>
                                    <td className='px-4 py-2 text-right'>${(item.product.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <Link to="/my-orders" className='mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>Back to Orders</Link>
            </div>
        )}
    </div>
  )
}

export default OrderDetails