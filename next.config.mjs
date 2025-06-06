/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource',
    });

    return config;
  },

 async headers() {
  const isDev = process.env.NODE_ENV === 'development';
  const scriptSrc = [
    "'self'",
    isDev ? "'unsafe-inline'" : null,
    isDev ? "'unsafe-eval'" : null,
  ].filter(Boolean).join(' ');

  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: `
            default-src 'self';
            script-src ${scriptSrc};
            connect-src 'self' https://eonet.gsfc.nasa.gov https://www.themuse.com https://nominatim.openstreetmap.org;
            img-src 'self' https: data:;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            font-src 'self' https://fonts.gstatic.com;
            object-src 'none';
            frame-ancestors 'none';
          `.replace(/\n/g, ' '),
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
      ],
    },
  ];
}
};


export default nextConfig;
