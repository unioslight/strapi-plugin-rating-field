'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-plugin-rating-field')
      .service('myService')
      .getWelcomeMessage();
  },
});
