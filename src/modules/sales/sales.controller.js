const service = require("./sales.service");

exports.handleCreateSale = async () => {
  await service.createSale();
  console.log("✅ Sale created");
};
