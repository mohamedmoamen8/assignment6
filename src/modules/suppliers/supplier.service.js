const db = require("../../config/db");

exports.createSupplier = async ({ SupplierName, ContactNumber }) => {
  const [result] = await db.query(
    `INSERT INTO Suppliers (SupplierName, ContactNumber)
     VALUES (?, ?)`,
    [SupplierName, ContactNumber]
  );

  return {
    SupplierID: result.insertId,
    SupplierName,
    ContactNumber
  };
};
