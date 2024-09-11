import Link from "next/link";

export const dynamic = "force-dynamic"; // For always fetching fresh data

async function fetchProducts(page = 1) {
  const skip = (page - 1) * 20;
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=20`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage({ searchParams }) {
  const page = searchParams.page || 1;
  let products;

  try {
    products = await fetchProducts(page);
  } catch (error) {
    return <p>Failed to load products. Please try again later.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-stone-100">
      <h1 className="text-3xl font-bold mb-8">Products
        
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link key={product.id} href={`/${product.id}`}>
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-40 w-full object-contain"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h2>
                <p className="text-green-600 font-bold mt-2">
                  ${product.price}
                </p>
                <p className="text-gray-500 text-sm">{product.category}</p>
              </div>
            </div>
          </Link>
        ))}
        </div>
</div>
  )}