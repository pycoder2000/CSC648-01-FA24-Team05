/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { // placeholder code to allow app to use images from other hosts
        remotePatterns: [
            {
                // Allows app to use images from ALL hosts
                protocol: 'https',
                hostname: "**", // change this when we create a database
            }
        ]
    }
    


};



export default nextConfig;
