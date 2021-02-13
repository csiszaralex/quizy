module.exports = {
  //.Bootsrtap és saját CSS jól legyen
  css: {
    loaderOptions: {
      sass: {
        prependData:
          '\n        @import "@/assets/style/main.scss";\n        @import "@/../node_modules/bootstrap/scss/bootstrap.scss";\n        ',
      },
    },
  },

  //.Netlify miatt
  pwa: {
    workboxOptions: {
      exclude: [/_redirects/],
    },
  },

  publicPath: '/quizy',
  assetsDir: 'assets',
};
//! Require def prop
//! req name prop -> warn
//! REQ prop types -> off
//!SORTKEYS
