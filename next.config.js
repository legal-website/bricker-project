/** @type {import('next').NextConfig} */
const nextConfig = {
    // Completely disable SWC
    swcMinify: false,
    experimental: {
      forceSwcTransforms: false,
    },
    // Ignore build errors to make development easier
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      unoptimized: true,
    },
    // Use Babel instead of SWC
    webpack: (config, { isServer, dev }) => {
      // Force use Babel for all JS/TS files
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["next/babel"],
            // Add any other babel options here
            cacheDirectory: true,
          },
        },
      })
  
      // Disable SWC loader
      config.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((r) => {
            if (r.use && r.use.loader === "next-swc-loader") {
              r.use = {
                loader: "babel-loader",
                options: {
                  presets: ["next/babel"],
                  cacheDirectory: true,
                },
              }
            }
          })
        }
      })
  
      return config
    },
  }
  
  module.exports = nextConfig
  