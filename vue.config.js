module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/style/main.scss";
        @import "@/../node_modules/bootstrap/scss/bootstrap.scss";
        `
      }
    }
  }
};
