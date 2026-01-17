const service = require("./supplier.service");

exports.createSupplier = async (req, res) => {
  try {
    const supplier = await service.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
