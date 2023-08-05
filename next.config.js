/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd32m9psmi7z6jn.cloudfront.net',
        pathname: '/',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'primefaces.org',
        pathname: '/',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'sciencekids.co.nz',
        pathname: '/',
        port: '',
      },
    ],
    domains: ['d32m9psmi7z6jn.cloudfront.net', 'primefaces.org', 'sciencekids.co.nz'],
  },
};

module.exports = nextConfig;
