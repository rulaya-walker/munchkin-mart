import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const MyOrderPage = () => {
    const [orders, setOrders] = useState([]); // Assuming you will fetch orders later
useEffect(() => {
    // Fetch orders from API or state management
    // const fetchOrders = async () => {
    //     // Simulate API call
    //     const response = await fetch('/api/orders');
    //     const data = await response.json();
    //     setOrders(data);
    // };
    // fetchOrders();
    setTimeout(() => {
        const mockOrders = [
            { _id: "1234", createdAt:new Date(),shippingAddress:{city:'New York',country:'Nepal'}, orderItems:[{
                name: 'Product 1', image: 'https://picsum.photos/200/200?random=1'
            }], quantity: 2, totalPrice: 50,
        isPaid:true
        },
            { _id: "1235", createdAt:new Date(),shippingAddress:{city:'Kathmandu',country:'Nepal'}, orderItems:[{
                name: 'Product 2', image: 'https://picsum.photos/200/200?random=2'
            }], quantity: 1, totalPrice: 30,
        isPaid:false
        },
            { _id: "1236", createdAt:new Date(),shippingAddress:{city:'Pokhara',country:'Nepal'}, orderItems:[{
                name: 'Product 3', image: 'https://picsum.photos/200/200?random=3'
            }], quantity: 3, totalPrice: 75,
        isPaid:true
        },
        {
            _id: "1237", createdAt:new Date(),shippingAddress:{city:'Lalitpur',country:'Nepal'}, orderItems:[{
                name: 'Product 4', image: 'https://picsum.photos/200/200?random=4'
            }], quantity: 1, totalPrice: 20,
        isPaid:false
        }
        ];
        setOrders(mockOrders);
    }, 1000);
}, []);
  return (
    <div className='container mx-auto p-4 sm:p-6'>
        <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
        <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>Order ID</th>
                        <th scope='col' className='px-6 py-3'>Date</th>
                        <th scope='col' className='px-6 py-3'>Shipping Address</th>     
                        <th scope='col' className='px-6 py-3'>Items</th>
                        <th scope='col' className='px-6 py-3'>Quantity</th>
                        <th scope='col' className='px-6 py-3'>Total Price</th>
                        <th scope='col' className='px-6 py-3'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                            <td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>
                                
                                <Link to={`/order/${order._id}`} className='text-blue-600 hover:underline'>#{order._id}</Link>
                            </td>
                            <td className='px-6 py-4'>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className='px-6 py-4'>{order.shippingAddress.city}, {order.shippingAddress.country}</td>
                            <td className='px-6 py-4'>
                                <div className='flex items-center space-x-2'>
                                    {order.orderItems.map((item, index) => (        
                                        <div key={index} className='flex items-center space-x-2'>
                                            <img src={item.image} alt={item.name} className='w-10 h-10 object-cover rounded' />
                                            <Link to={`/product/${item._id}`} className='text-blue-600 hover:underline'>{item.name}</Link>
                                        </div>
                                    ))}

                                </div>
                            </td>
                            <td className='px-6 py-4'>{order.quantity}</td>
                            <td className='px-6 py-4'>${order.totalPrice.toFixed(2)}</td>
                            <td className='px-6 py-4'><span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{order.isPaid ? 'Paid' : 'Pending'}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MyOrderPage