const mysql = require("mysql2/promise");

async function initDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3307,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS retail_store`);
  await connection.query(`USE retail_store`);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS Suppliers (
      SupplierID INT AUTO_INCREMENT PRIMARY KEY,
      SupplierName VARCHAR(255),
      ContactNumber VARCHAR(15)
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS Products (
      ProductID INT AUTO_INCREMENT PRIMARY KEY,
      ProductName VARCHAR(255) NOT NULL,
      Price DECIMAL(10,2),
      StockQuantity INT,
      SupplierID INT,
      FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS Sales (
      SaleID INT AUTO_INCREMENT PRIMARY KEY,
      ProductID INT,
      QuantitySold INT,
      SaleDate DATE,
      FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
    )
  `);

  await connection.end();
  console.log("✅ Database & tables created");
}

module.exports = initDatabase;
