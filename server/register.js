"use strict";
const pkg = require("../package.json");

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: pkg.strapi.name,
    plugin: "rating-field",
    type: "integer",
  });
};
