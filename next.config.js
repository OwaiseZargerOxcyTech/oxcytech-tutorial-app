/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes except `/contactus`.
        source: "/((?!contactus|blog|blogwn).*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self'; 
              script-src 'self' 'unsafe-eval' 'unsafe-inline'; 
              style-src 'self' 'unsafe-inline' https://unpkg.com; 
              font-src 'self' https://unpkg.com; 
              img-src *; 
              connect-src 'self' https://unpkg.com ; 
              frame-src 'self' https://www.google.com https://maps.google.com;
            `.replace(/\n/g, ""), // CSP rules for allowing external resources from unpkg
          },
        ],
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: "/dashboard",
        destination: "/dashboards",
        permanent: false,
      },
      {
        source: "/table",
        destination: "/tables",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/aboutus",
        permanent: false,
      },
      {
        source: "/services",
        destination: "/service",
        permanent: false,
      },
      {
        source: "/blogs",
        destination: "/blog1",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/contactus",
        permanent: false,
      },
    ];
  },

  images: {
    domains: [
      "tailwindui.com",
      "www.w3.org",
      "images.unsplash.com",
      "ohio.clbthemes.com",
      "demo.rivaxstudio.com",
    ],
  },

  swcMinify: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tzafjtp2uu0yirew.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },

  // experimental: {
  //   serverActions: true,
  // },
};

module.exports = nextConfig;
