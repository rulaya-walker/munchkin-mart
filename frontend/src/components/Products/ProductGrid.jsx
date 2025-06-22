import {Link} from 'react-router-dom';
import { useState } from 'react';

const ProductGrid = ({products, loading, error}) => {
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    // Force reload the current page
    window.location.reload();
    setRetryCount(retryCount + 1);
  };

  if (loading) {
    return <p className='text-center text-gray-500 py-8'>Loading products...</p>;
  }
  
  if (error) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-500 mb-4'>Error loading products: {error}</p>
        <button 
          onClick={handleRetry} 
          className='bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark'
        >
          Retry
        </button>
        {error.includes('Network error') && (
          <p className='mt-4 text-sm text-gray-600'>
            Please check that the backend server is running and accessible.
          </p>
        )}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <p className='text-center text-gray-500 py-8'>No products found matching your criteria.</p>;
  }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((product) => (
            <Link
                key={product._id}
                to={`/product/${product._id}`}
                className='block p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow'
            >
                <img src={product.images[0].url} alt={product.images[0].alt} className='w-full h-96 object-cover rounded-lg mb-4' />
                <h3 className='text-lg font-semibold text-gray-700'>{product.name}</h3>
                <p className='text-gray-500'>${product.price.toFixed(2)}</p>
            </Link>
        ))}
    </div>
  )
}

export default ProductGrid