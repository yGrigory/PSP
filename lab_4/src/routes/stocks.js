const express = require("express");
const stocksController = require("../controllers/stocksController");

const router = express.Router();

router.head("/", stocksController.headAllStocks);
router.head("/:id", stocksController.headStockById);
router.options("/", stocksController.optionsStocks);
router.options("/:id", stocksController.optionsStockById);
router.get("/", stocksController.getAllStocks);
router.get("/:id", stocksController.getStockById);
router.post("/", stocksController.createStock);
router.patch("/:id", stocksController.updateStock);
router.delete("/:id", stocksController.deleteStock);

module.exports = router;
