'use client';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import ClientSideImage from "./ClientSideImage"; // Import ClientSideImage component

/**
 * A carousel component to display product images.
 *
 * This component uses the `react-slick` library to create a carousel
 * of images. It receives an array of image URLs as a prop and displays
 * them in a slider. The slider settings include dots for navigation,
 * infinite scrolling, and a smooth transition speed.
 *
 * @param {Object} props - The component's props.
 * @param {string[]} props.images - An array of image URLs to display in the carousel.
 * @returns {JSX.Element} The rendered image carousel component.
 */
const ProductsImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (Array.isArray(images)) {
      setProductImages(images);
    }
  }, [images]);

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {productImages.map((image, index) => (
          <div key={index}>
            {/* Replace <img> with ClientSideImage for better error handling and fallback */}
            <ClientSideImage
              src={image}
              alt={`Product image ${index + 1}`}
              fallback="/fallback-image.jpg" // Add your desired fallback image path here
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsImageCarousel;
