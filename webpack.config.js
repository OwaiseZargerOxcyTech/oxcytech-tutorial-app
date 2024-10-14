const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      net: false,
      tls: false,
    },
  },
};
