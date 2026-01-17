const db = require("../../config/db");

exports.insertSale = async () => {
  const [[milk]] = await db.query(
    `SELECT ProductID FROM Products WHERE ProductName='Milk'`
  );

  await db.query(`
    INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
    VALUES (?, 2, '2025-05-20')
  `, [milk.ProductID]);
};

exports.totalSoldPerProduct = async () => {
  const [rows] = await db.query(`
    SELECT P.ProductName, SUM(S.QuantitySold) AS TotalSold
    FROM Products P
    LEFT JOIN Sales S ON P.ProductID=S.ProductID
    GROUP BY P.ProductID
  `);
  return rows;
};

exports.allSales = async () => {
  const [rows] = await db.query(`
    SELECT S.SaleID, P.ProductName, S.QuantitySold, S.SaleDate
    FROM Sales S
    JOIN Products P ON S.ProductID=P.ProductID
  `);
  return rows;
};
