import { Link } from 'react-router-dom';
import hereoImage from '../../assets/munchkin-hero.png'; // Adjust the path as necessary

const Hero = () => {
  return (
    <section className='relative flex items-center justify-center overflow-hidden'>
        <img src={hereoImage} alt="Hero" className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover object-top-left mb-8" />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className='text-center text-white p-6'>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tighter text-white text-center uppercase'>Welcome to<br/> Munchkin Mart</h1>
          <p className='text-lg'>Your one-stop shop for all baby and toddler needs.</p>
          <Link to="/shop" className='mt-4 inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all'>
            Shop Now
          </Link>
        </div>

      </div>

    </section>
  )
}

export default Hero