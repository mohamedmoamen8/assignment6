const express = require("express");
const bootstrap = require("./bootstrap");

const supplierRoutes = require("./modules/suppliers/supplier.routes");
const productRoutes = require("./modules/products/product.routes");
const salesRoutes = require("./modules/sales/sales.routes");

const app = express();
app.use(express.json());

app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);
app.use("/sales", salesRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

(async () => {
  await bootstrap();
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`),
  );
})();
