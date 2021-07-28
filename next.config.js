const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      //   {
      //     source: "/contract/:id",
      //     destination: "/",
      //     permanent: true,
      //   },
    ];
  },
};
