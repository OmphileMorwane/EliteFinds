const ProductImage = ({ src, alt }) => {
        return (
          <img
            src={src}
            alt={alt}
            className="w-full h-96 object-contain rounded-lg shadow-lg bg-stone-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-image.jpg";
            }}
          />
        );
      };
      
      export default ProductImage;