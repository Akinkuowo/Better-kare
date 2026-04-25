/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost',
            'images.unsplash.com',
            'public.blob.vercel-storage.com',
        ],
    },
};

export default nextConfig;