"use strict";

/**
 * get-revenue service
 */

const sumOf = (orders) => {
  var sum = 0;
  for (var i = 0; i < orders.length; i++) {
    sum += +orders[i].totalPrice;
  }
  return sum;
};

module.exports = () => ({
  async getRevenue() {
    try {
      const entries = await strapi.entityService.findMany("api::order.order");
      return { revenue: sumOf(entries) };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
});
