import {Link} from 'react-router-dom';

const ProductGrid = ({products}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((product) => (
            <Link
                key={product._id}
                to={`/products/${product._id}`}
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