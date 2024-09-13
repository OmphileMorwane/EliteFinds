'use client'; // Ensure this file is treated as a client component

import Image from 'next/legacy/image';
import { useState } from 'react';

/**
 * ClientSideImage component for displaying images with fallback.
 *
 * @param {Object} props - Component props.
 * @param {string} props.src - The source URL of the image.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} props.fallback - The fallback image URL in case of an error.
 * @returns {JSX.Element} - The rendered component.
 */
const ClientSideImage = ({ src, alt, fallback }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallback);
  };

  return (
    <div className="image-container">
      <Image
        src={imgSrc}
        alt={alt}
        className="custom-image"
        layout="responsive"
        width={150} // Adjust the width as needed
        height={150} // Adjust the height as needed
        onError={handleError}
      />
    </div>
  );
};

export default ClientSideImage;

