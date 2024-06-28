"use strict";

/**
 * A set of functions called "actions" for `get-revenue`
 */

module.exports = {
  async getRevenue(ctx) {
    try {
      const data = await strapi
        .service("api::get-revenue.get-revenue")
        .getRevenue();
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
};