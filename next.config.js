/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'blog-site-backend-vsox.onrender.com',
                port: '',
                pathname: '/uploads/images/**',
            },
            {
                protocol: 'https',
                hostname: 'images7.alphacoders.com',
                port: '',
                pathname: '/**',
            }
        ],
    }
}

module.exports = nextConfig
