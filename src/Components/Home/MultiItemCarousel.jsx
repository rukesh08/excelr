import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { menu_list } from './Dishes';
import CarouselItem from './CarouselItem';

const MultiItemCarousel = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay:true,
        autoplaySpeed:2000,
        arrows:false
    };
  return (
    <div>
        <Slider {...settings}>
            {menu_list.map((item)=> ( 
                <CarouselItem menu_image={item.menu_image} menu_name={item.menu_name} />
                ))}
        </Slider>
    </div>
  )
}

export default MultiItemCarousel