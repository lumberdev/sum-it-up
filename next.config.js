/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /canvas/ })); // There's an issue where canvas is required for JSDOM even though it's optional
    return config;
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
