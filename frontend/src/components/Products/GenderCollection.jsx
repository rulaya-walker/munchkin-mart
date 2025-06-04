import { Link } from "react-router-dom"
import mensCollectionImage from '../../assets/mens-collection.webp'
import womensCollectionImage from '../../assets/womens-collection.webp'

const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8"> 

        <div className="container mx-auto flex flex-col md:flex-row gap-8">
          <div className="flex-1 relative">
             <img src={mensCollectionImage} alt="Men's Collection" className="w-full h-[700px] object-cover" />
             <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-4">
                 <h3 className="text-2xl font-bold text-gray-900 mb-3">Men's Collection</h3>
                 <p className="text-sm">Explore our range of men's clothing and accessories.</p>

            <Link to="/shop/mens" className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all">
             Men's Collection
            </Link>
             </div>
          </div>
        </div>
         <div className="container mx-auto flex flex-col md:flex-row gap-8">
          <div className="flex-1 relative">
             <img src={womensCollectionImage} alt="Women's Collection" className="w-full h-[700px] object-cover" />
             <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-4">
                 <h3 className="text-2xl font-bold text-gray-900 mb-3">Women's Collection</h3>
                 <p className="text-sm">Explore our range of women's clothing and accessories.</p>

            <Link to="/shop/womens" className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all">
             Women's Collection
            </Link>
             </div>
          </div>
        </div>
        </div>
    </section>
  )
}

export default GenderCollection