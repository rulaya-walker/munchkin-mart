import {useState,useEffect } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom';

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender:"",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = [
    "Baby's Top Wear",
    "Baby's Bottom Wear",
    "Baby's Shoes",
    "Baby's Accessories",
    "Baby's Toys",
  ];
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
  ];
  const sizes = [
    "Small",
    "Medium",
    "Large",
    "Extra Large"
  ];
  const materials = [
    "Cotton",
    "Polyester",
    "Wool",
    "Silk",
  ];
  const brands = [
    "Brand A",
    "Brand B",
    "Brand C",
  ];
  const genders = [
    "Boys",
    "Girls",
    "Unisex",
  ];

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(',') : [],
      material: params.material ? params.material.split(',') : [],
      brand: params.brand ? params.brand.split(',') : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100
    });
    setPriceRange([params.minPrice || 0, params.maxPrice || 100]);
  }, [searchParams]);
const handleFilterChange = (e) => {
  const { name, value, type, checked } = e.target;
 let newFilters = { ...filters };
 if(type ==='checkbox') {
   if(checked) {
     newFilters[name] = [...(newFilters[name] || []), value]; //["XS", "S", "M"]
   } else {
     newFilters[name] = (newFilters[name] || []).filter((v) => v !== value);
   }
 } else {
   newFilters[name] = value;
 }

 setFilters(newFilters);
 updateURLParams(newFilters);
 };
 const updateURLParams =  (newFilters) => {
   const params = new URLSearchParams();
   for (const key in newFilters) {
     if (Array.isArray(newFilters[key])) {
       params.set(key, newFilters[key].join(','));
     } else {
       params.set(key, newFilters[key]);
     }
   }
   setSearchParams(params);
       navigate(`?${params.toString()}`); // Update the URL with new search params ?category=Baby's%20Top%20Wear&gender=Boys&color=Red&size=Small,Medium&material=Cotton,Wool&brand=Brand%20A,Brand%20B&minPrice=0&maxPrice=100
};

const handlePriceChange = (e) => {
  const newPrice = e.target.value;
  setPriceRange([0, newPrice]);
  // Update filters with new price range
  //const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
  // Update the filters state
  //setFilters(newFilters);
  setFilters((prev) => ({
    ...prev,
    minPrice: 0,
    maxPrice: newPrice
  }));
  updateURLParams({
    ...filters,
    minPrice: 0,
    maxPrice: newPrice
  });
};


  return (
    <div className='pt-4 px-2'>
      <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter Products</h3>
      {/* Category Filter */}
      <div className='mb-6'>
        <h4 className='text-lg font-medium text-gray-800 mb-2'>Category</h4>
        <ul>
          {categories.map((cat) => (
            <li key={cat}>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  name='category'
                  value={cat}
                  onChange={handleFilterChange}
                  checked={filters.category === cat}
                  className='form-radio h-4 w-4 text-blue-500 focus:ring-blue-400 transition duration-150 ease-in-out'
                />
                <span className='ml-2 text-gray-700'>{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Gender Filter */}
      <div className='mb-6'>
        <h4 className='text-lg font-medium text-gray-800 mb-2'>Gender</h4>
        <ul>
          {genders.map((gen) => (
            <li key={gen}>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  name='gender'
                  value={gen}
                  checked={filters.gender === gen}
                  onChange={handleFilterChange}
                  className='form-radio h-4 w-4 text-blue-500 focus:ring-blue-400 transition duration-150 ease-in-out'
                />
                <span className='ml-2 text-gray-700'>{gen}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* Color Filter */}
      <div className='mb-6'>
        <h4 className='text-lg font-medium text-gray-800 mb-2'>Color</h4>
       <div className='flex flex-wrap gap-2'>
          {colors.map((color) => (
            <button
              key={color}
              name='color'
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? 'ring-2 ring-blue-500' : ''}`}
              style={{ backgroundColor: color.toLowerCase() }}
            >
            </button>
          ))}
        </div>
      </div>
      {/* Size Filter */}
      <div className='mb-6'>
        <h4 className='text-lg font-medium text-gray-800 mb-2'>Size</h4>
        <ul className='flex flex-col space-y-1'>
          {sizes.map((size) => (
            <li key={size}>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  name='size'
                  value={size}
                  onChange={handleFilterChange}
                  checked={filters.size.includes(size)}
                  className='form-checkbox h-4 w-4 text-blue-500 focus:ring-blue-400 transition duration-150 ease-in-out'
                />
                <span className='ml-2 text-gray-700'>{size}</span>
              </label>
            </li>
          ))}
        </ul> 
    </div>
    {/* Materials Filter */}
    <div className='mb-6'>
      <h4 className='text-lg font-medium text-gray-800 mb-2'>Material</h4>
      <ul className='flex flex-col space-y-1'>
        {materials.map((material) => (
          <li key={material}>
            <label className='flex items-center'>
              <input
                type='checkbox'
                name='material'
                value={material}
                onChange={handleFilterChange}
                checked={filters.material.includes(material)}
                className='form-checkbox h-4 w-4 text-blue-500 focus:ring-blue-400 transition duration-150 ease-in-out'
              />
              <span className='ml-2 text-gray-700'>{material}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
    {/* Brands Filter */}
    <div className='mb-6'>
      <h4 className='text-lg font-medium text-gray-800 mb-2'>Brand</h4>
      <ul className='flex flex-col space-y-1'>
        {brands.map((brand) => (
          <li key={brand}>
            <label className='flex items-center'>
              <input
                type='checkbox'
                name='brand'
                value={brand}
                onChange={handleFilterChange}
                checked={filters.brand.includes(brand)}
              />
              <span className='ml-2 text-gray-700'>{brand}</span>
            </label>
          </li>
        ))}
      </ul>
      </div>
      {/* Price Range Filter */}
      <div className='mb-6'>
        <h4 className='text-lg font-medium text-gray-800 mb-2'>Price Range</h4>
        <input type='range'
          min='0'
          max='100'
        value={priceRange[1]}
        onChange={handlePriceChange}
          className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'
        />
        <div className='flex justify-between text-sm text-gray-600 mt-2'>
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      </div>
    )
  }

export default FilterSidebar