/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'theperfectevent.com',
      },
      {
        protocol: 'http',
        hostname: 'theperfectevent.com',
      },
    ],
  },
}

module.exports = nextConfig
