"use client";
import Image from 'next/legacy/image';
import { useState } from 'react';

/**
 * ClientSideImage component for displaying images with fallback and lazy loading.
 *
 * @param {Object} props - Component props.
 * @param {string} props.src - The source URL of the image.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} props.fallback - The fallback image URL in case of an error.
 * @returns {JSX.Element} - The rendered component.
 */
const ClientSideImage = ({ src, alt, fallback }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true); // Set error state when image fails to load
    if (fallback) {
      setImgSrc(fallback); // Use fallback image if provided
    }
  };

  return (
    <div className="image-container">
      {!hasError ? (
        <Image
          src={imgSrc}
          alt={alt}
          className="custom-image"
          layout="responsive"
          width={150}
          height={150}
          onError={handleError}
          loading="lazy" // Lazy load images for better performance
        />
      ) : (
        <div className="error-placeholder flex justify-center items-center h-40 w-full bg-gray-200">
          {/* Placeholder text displayed when image fails to load */}
          <p className="text-center text-gray-500">Image not available</p>
        </div>
      )}
    </div>
  );
};

export default ClientSideImage;
 

