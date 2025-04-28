/** @type {import('next').NextConfig} */
const nextConfig = {
  
  // pageExtensions: [
  //       "page.tsx",
  //       "page.ts",
  //       // FIXME: Next.js has a bug which does not resolve not-found.page.tsx correctly
  //       // Instead, use `not-found.ts` as a workaround
  //       // "ts" is required to resolve `not-found.ts`
  //       // https://github.com/vercel/next.js/issues/65447
  //       "ts"
  //   ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
