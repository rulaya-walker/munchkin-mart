import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAdminOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice';
import { toast } from 'sonner';

const Orders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {adminOrders, loading, error} = useSelector((state) => state.adminOrders);
    useEffect(() => {
        if(!user || user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);
    useEffect(() => {
        // Fetch admin orders when component mounts
        if(user && user.role === 'admin') {
            dispatch(fetchAdminOrders());
        }
    }, [dispatch, user]);
const handleChangeStatus = (orderId, newStatus) => {
        // Logic to change order status
        dispatch(updateOrderStatus({ id: orderId, status: newStatus })).then((response) => {
            if(response.error) {
                toast.error(`Failed to update order status: ${response.error.message}`);
            }else{
                toast.success('Order status updated successfully', {
                    duration: 2000
                });
            }
        });
    };
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>Order Management</h2>
        
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{error}</p>
            </div>
        )}
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full bg-white'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Customer</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total Price</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan='5' className='px-6 py-4 text-center'>Loading orders...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan='5' className='px-6 py-4 text-center text-red-500'>{error}</td>
                        </tr>
                    ) : adminOrders?.length > 0 ? adminOrders.map(order => (
                        <tr key={order._id} className='border-b border-gray-300 hover:bg-gray-50'>
                            <td className='px-6 py-4 whitespace-nowrap'>{order._id}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{order.user?.name || 'Unknown User'}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>${order.totalPrice?.toFixed(2) || '0.00'}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <select
                                    value={order.status || 'Processing'}
                                    onChange={(e) => { handleChangeStatus(order._id, e.target.value) }}
                                    className='border border-gray-300 p-2 rounded w-full'
                                >
                                    <option value='Processing'>Processing</option>
                                    <option value='Shipped'>Shipped</option>
                                    <option value='Delivered'>Delivered</option>
                                    <option value='Cancelled'>Cancelled</option>
                                </select>

                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <button 
                                    onClick={() => handleChangeStatus(order._id, 'Delivered')} 
                                    className='bg-green-500 rounded px-4 py-1 text-white cursor-pointer hover:bg-green-600 mr-2'
                                >
                                    Mark as Delivered
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan='5' className='px-6 py-4 text-center'>No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Orders