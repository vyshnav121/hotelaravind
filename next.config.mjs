/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "recipesaresimple.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "www.maggi.in",
            },
            {
                protocol: "https",
                hostname: "www.theraviz.com",
            },
        ],
    },
};

export default nextConfig;
