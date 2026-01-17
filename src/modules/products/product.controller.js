const service = require("./product.service");

exports.createProduct = async (req, res) => {
  const product = await service.createProduct(req.body);
  res.status(201).json(product);
};
