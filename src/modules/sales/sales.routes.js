const controller = require("./sales.controller");

module.exports = async function salesRoutes() {
  await controller.handleCreateSale();
};
