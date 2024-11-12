/** @type {import('next').NextConfig} */
export const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '0.0.0.0',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '137.184.177.241',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
