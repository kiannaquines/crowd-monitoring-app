/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'api.taralibrary.online',
            port: '',
            pathname: '/static/**',
            },
        ],
    },
};

export default nextConfig;
