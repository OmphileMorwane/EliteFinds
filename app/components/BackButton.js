
"use client"; // Ensure this is a client component

import { useRouter } from "next/navigation";

/**
 * A button component that navigates the user back to the previous page.
 *
 * This component uses the `useRouter` hook from Next.js to access the router
 * and performs navigation when clicked. It is typically used to return to a
 * previous view or page, such as returning to a product list from a product
 * detail page.
 *
 * @component
 * @example
 * return <BackButton />;
 */
const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
    >
      Back to Products
    </button>
  );
};

export default BackButton;
