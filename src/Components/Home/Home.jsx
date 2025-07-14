import React from 'react'
import './Home.css'
import MultiItemCarousel from './MultiItemCarousel'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllRestaurantsAction } from '../State/Restaurant/Action'
import { findCart } from '../State/Cart/Action'

const restaurants=[1,1,1,1,1,1,1,1]
const Home = () => {
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt")
    const {restaurant}=useSelector(store=>store)
    console.log("restaurant",restaurant);
    
    useEffect(()=>{
      console.log(localStorage.getItem("token"));
      dispatch(getAllRestaurantsAction(jwt));
      
    },[])

    
  return (
    <div className='pb-10'>
        <section className='banner -z-50 relative flex flex-col justify-center items-center'>
            <div className='w-[40vw] z-10 text-center'>
                <p className='text-2xl text-gray-50 lg:text-6xl font-bold z-10 py-5'>Explore our menu #tomato food delivery app</p>
                <p className='z-10 text-gray-200 font-semibold text-xl lg:text-4x1'>Experience fast & easy online ordering on the Tomato app</p>
            </div>
            <div className='cover absolute top-0 left-0 right-0'>

            </div>
            <div className='fadeout'>

            </div>
        </section>
        <section className='p-10 lg:py-10 lg:px-20' >
            <p className='text-2xl font-extrabold text-gray-400 py-3 pb-10'>Top dishes </p>
            <MultiItemCarousel />
        </section>
        <section className='px-5 lg:px-20 pt-10'>
            <h1 className='text-2xl font-extrabold text-gray-400 pb-8'>Order From Our Handpicked Favorite Restaurants</h1>
            <div className='flex flex-wrap items-center justify-around gap-5'>
              {
                  restaurant.restaurants.map((item)=> <RestaurantCard  item={item}/>)
              }
            </div>
        </section>
    </div>
  )
}

export default Home
