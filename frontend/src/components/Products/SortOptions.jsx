import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (value === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    setSearchParams(params);
  }
  return (
    <div className='mb-4 flex items-center justify-end'>
      <label htmlFor='sort' className='text-sm font-medium text-gray-700 mr-2'>
        Sort by:
      </label>
      <select
        id='sort'
        name='sort'
        onChange={handleChange}
        value={searchParams.get('sort') || 'default'}
        className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:outeline-none'
      >
        <option value='default'>Default</option>
        <option value='price-low-to-high'>Price: Low to High</option>
        <option value='price-high-to-low'>Price: High to Low</option>
        <option value='newest'>Newest Arrivals</option>
        <option value='best-selling'>Best Selling</option>
      </select>

    </div>
  )
}

export default SortOptions