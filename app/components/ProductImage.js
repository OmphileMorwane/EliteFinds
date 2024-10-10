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