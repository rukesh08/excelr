import React from 'react'
const CarouselItem = ({menu_image,menu_name}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <img className='w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full object-cover object-center' src={menu_image} alt="" />
        <span className='py-5 font-semibold text-xl text-gray-400'>{menu_name}</span>
    </div>
  )
}

export default CarouselItem
