import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchAdminProducts } from '../redux/slices/adminProductSlice';
import { fetchAdminOrders } from '../redux/slices/adminOrderSlice';

const AdminHome = () => {
    const dispatch = useDispatch();
    const {adminProducts, loading: productsLoading, error: productsError} = useSelector((state) => state.adminProducts);
    const { adminOrders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector((state) => state.adminOrders);
    useEffect(() => {
        dispatch(fetchAdminProducts());
        dispatch(fetchAdminOrders());
    }, [dispatch]);
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
        {productsLoading || ordersLoading ? (
            <div className='text-center text-gray-500'>Loading...</div>): productsError ? (
            <div className='text-center text-red-500'>Error loading products: {productsError}</div>
        ) : ordersError ? (
            <div className='text-center text-red-500'>Error loading orders: {ordersError}</div>
        ) : null}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='p-4 shadow-md rounded-lg'>
                <h2 className='text-xl font-semibold mb-4'>Revenue</h2>
                <p className='text-2xl font-bold'>${totalSales}</p>
            </div>
            <div className='p-4 shadow-md rounded-lg'>
                <h2 className='text-xl font-semibold mb-4'>Total Orders</h2>
                <p className='text-2xl font-bold'>{totalOrders}</p>
                <Link to='/admin/orders' className='text-blue-500 hover:underline mt-2 inline-block'>Manage Orders</Link>
            </div>

            <div className='p-4 shadow-md rounded-lg'>
                <h2 className='text-xl font-semibold mb-4'>Total Products</h2>
                <p className='text-2xl font-bold'>{adminProducts.length}</p>
                <Link to='/admin/products' className='text-blue-500 hover:underline mt-2 inline-block'>Manage Products</Link>
            </div>
        </div>
        <div className='mt-6'>
            <h2 className='text-xl font-semibold mb-4'>Recent Orders</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white shadow-md rounded-lg'>
                    <thead>
                        <tr className='bg-gray-100 text-gray-700'>
                            <th className='py-2 px-4 text-left'>Order ID</th>
                            <th className='py-2 px-4 text-left'>Customer</th>
                            <th className='py-2 px-4 text-left'>Total</th>
                            <th className='py-2 px-4 text-left'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminOrders.length > 0 ? (adminOrders.map((order) => (
                            <tr key={order.id} className='border-b border-gray-100 hover:bg-gray-50'>
                                <td className='py-2 px-4'><Link to={`/admin/order/${order._id}`}>#{order._id}</Link></td>
                                <td className='py-2 px-4'>{order.user.name}</td>
                                <td className='py-2 px-4'>${order.totalPrice.toFixed(2)}</td>
                                <td className='py-2 px-4'>{order.status}</td>
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan='4' className='py-2 px-4 text-center'>No recent orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  )
}

export default AdminHome