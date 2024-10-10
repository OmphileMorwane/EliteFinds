/**
 * A component to display a product image with a fallback option.
 *
 * This component utilizes the `ClientSideImage` component to render
 * an image with error handling. If the image fails to load, a fallback
 * image will be displayed instead.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.src - The source URL of the product image.
 * @param {string} props.alt - The alternative text for the image.
 * @returns {JSX.Element} The rendered product image component.
 */
const ProductImage = ({ src, alt }) => {
  return (
    <ClientSideImage 
      src={src} 
      alt={alt} 
      fallback="/fallback-image.jpg" 
    />
  );
};

export default ProductImage;
