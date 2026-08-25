/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/pitches',
        destination: '/pools/my',
        permanent: true,
      },
      {
        source: '/pitches/:path*',
        destination: '/pools/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
