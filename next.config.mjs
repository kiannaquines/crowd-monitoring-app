/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'http',
            hostname: '10.0.0.195',
            port: '',
            pathname: '/static/**',
            },
        ],
    },
};

export default nextConfig;
