const express = require("express");
const controller = require("./product.controller");

const router = express.Router();

router.post("/", controller.createProduct);

module.exports = router;
