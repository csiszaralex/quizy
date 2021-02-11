module.exports = {
  //.Bootsrtap és saját CSS jól legyen
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/style/main.scss";
        @import "@/../node_modules/bootstrap/scss/bootstrap.scss";
        `,
      },
    },
  },
  //.Netlify miatt
  pwa: {
    workboxOptions: {
      exclude: [/_redirects/],
    },
  },
};
