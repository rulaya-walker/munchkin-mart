import React, { useState } from 'react'

const Orders = () => {
    const orders = [
        { id: 1, name: 'Order 1', customer: 'Customer 1', totalPrice: 100, status: 'Pending' },
        { id: 2, name: 'Order 2', customer: 'Customer 2', totalPrice: 200, status: 'Shipped' },
        { id: 3, name: 'Order 3', customer: 'Customer 3', totalPrice: 300, status: 'Delivered' },
        { id: 4, name: 'Order 4', customer: 'Customer 4', totalPrice: 400, status: 'Cancelled' }
    ];
const handleChangeStatus = (orderId, newStatus) => {
        // Logic to change order status
        console.log(`Changing status for order ${orderId} to ${newStatus}`);
    };
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>Order Management</h2>
        
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full bg-white'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Role</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? orders.map(order => (
                        <tr key={order.id} className='border-b border-gray-300 hover:bg-gray-50'>
                            <td className='px-6 py-4 whitespace-nowrap'>{order.id}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{order.name}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{order.customer}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{order.totalPrice}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{order.status}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <select
                                    value={order.status}
                                    onChange={(e) => { handleChangeStatus(order.id, e.target.value) }}
                                    className='border border-gray-300 p-2 rounded w-full'
                                >
                                    <option value='Pending'>Pending</option>
                                    <option value='Shipped'>Shipped</option>
                                    <option value='Delivered'>Delivered</option>
                                    <option value='Cancelled'>Cancelled</option>
                                </select>

                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <button onClick={() => handleChangeStatus(order.id, 'Delivered')} className='bg-green-500 rounded px-4 py-1 text-white cursor-pointer hover:bg-green-600'>Mark as Delivered</button>
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