const db = require("../../config/db");

exports.createProduct = async ({
  ProductName,
  Price,
  StockQuantity,
  SupplierID
}) => {
  const [result] = await db.query(
    `INSERT INTO Products 
     (ProductName, Price, StockQuantity, SupplierID)
     VALUES (?, ?, ?, ?)`,
    [ProductName, Price, StockQuantity, SupplierID]
  );

  return { ProductID: result.insertId, ProductName };
};
