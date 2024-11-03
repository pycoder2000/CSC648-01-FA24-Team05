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
        hostname: '64.23.143.71',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
