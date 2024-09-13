"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useEffect } from "react";

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [productImages, setProductImages ] = useState([])

  useEffect(()=> {
        if(Array.isArray(images)) {
                setProductImages(images)
        }
        console.log("New Array",productImages)
  },[images])


  console.log(productImages)
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {productImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Product image ${index + 1}`}
              className="w-full h-96 object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
