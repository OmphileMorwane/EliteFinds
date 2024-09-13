/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Assuming your image uses HTTPS
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
};

module.exports = nextConfig;