import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductSlice';
import { toast } from 'sonner';

const ProductManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    const {adminProducts, loading, error} = useSelector((state) => state.adminProducts);
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');  // Redirect to home if user is not an admin
        }
    }, [user,navigate]);

    useEffect(() => {
        if (user && user.role === 'admin') {
            dispatch(fetchAdminProducts());
        }
    }, [dispatch, user]);

    const handleDeleteProduct = (id) => {
        // Logic to delete product
        if (window.confirm('Are you sure you want to delete this product?')) {
            // Here you would typically make an API call to delete the product
            dispatch(deleteProduct(id)).then((response) => {
                if (response.error) {
                    toast.error(`Failed to delete product: ${response.error.message}`, {
                        duration: 2000
                    });
                } else {
                    toast.success('Product deleted successfully', {
                        duration: 2000
                    });
                }
            });
        }
    };
    if(loading) {
        return <div className='text-center p-6'>Loading products...</div>;
    }
    if(error) {
        return <div className='text-center p-6 text-red-500'>Error loading products: {error}</div>;
    }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>Product Management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full bg-white'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>SKU</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {adminProducts.length > 0 ? adminProducts.map(product => (
                        <tr key={product.id} className='border-b border-gray-300 hover:bg-gray-50'>
                            <td className='px-6 py-4 whitespace-nowrap'>{product._id}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>${product.price.toFixed(2)}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{product.sku}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <Link to={`/admin/products/${product._id}/edit`} className='bg-yellow-500 text-white px-2 py-1 rounded mr-4'>Edit</Link>
                                <button onClick={() => handleDeleteProduct(product._id)} className='bg-red-500 rounded px-2 py-1 text-white cursor-pointer hover:bg-red-600'>Delete</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="5" className='px-6 py-4 text-center'>No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductManagement