// @ts-check
 
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
     
      },
      {
        protocol: 'https',
        hostname: 'juli-food-ordering.s3.amazonaws.com',
     
      },
    ],
  },
}
 
export default nextConfig
