const express = require("express");
const controller = require("./supplier.controller");

const router = express.Router();

router.post("/", controller.createSupplier);

module.exports = router;
