// components/BackButton.js
"use client"; // Ensure this is a client component

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Back to Products
    </button>
  );
};

export default BackButton;
