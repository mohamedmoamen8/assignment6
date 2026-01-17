const mysql = require("mysql2/promise");

module.exports = async function bootstrap() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3307
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
      ProductName VARCHAR(255),
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

  await connection.query(`
    CREATE USER IF NOT EXISTS 'store_manager'@'localhost'
    IDENTIFIED BY 'password123'
  `);

  await connection.query(`
    GRANT SELECT, INSERT ON retail_store.* TO 'store_manager'@'localhost'
  `);

  await connection.end();

  console.log("✅ Bootstrap completed");
};
