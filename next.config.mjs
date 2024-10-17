/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
            },
        ],
        domains: [
            'lh3.googleusercontent.com',
            'storage.googleapis.com'
        ],
    },
};

export default nextConfig;
