/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: '137.184.177.241',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
