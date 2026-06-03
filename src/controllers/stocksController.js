const stocksService = require("../services/stocksService");

const STOCKS_ALLOW_HEADER = "GET, HEAD, POST, PATCH, DELETE, OPTIONS";
const STOCK_ALLOW_HEADER = "GET, HEAD, PATCH, DELETE, OPTIONS";

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const getAllStocks = (req, res) => {
  const stocks = stocksService.findAll(req.query.title);
  res.json(stocks);
};

const getStockById = (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Некорректный id сервиса" });
  }

  const stock = stocksService.findById(id);

  if (!stock) {
    return res.status(404).json({ error: "Сервис не найден" });
  }

  return res.json(stock);
};

const headAllStocks = (req, res) => {
  const stocks = stocksService.findAll(req.query.title);
  res.setHeader("X-Total-Count", stocks.length);
  return res.status(200).end();
};

const headStockById = (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).end();
  }

  const stock = stocksService.findById(id);

  if (!stock) {
    return res.status(404).end();
  }

  return res.status(200).end();
};

const optionsStocks = (req, res) => {
  res.setHeader("Allow", STOCKS_ALLOW_HEADER);
  return res.status(204).end();
};

const optionsStockById = (req, res) => {
  res.setHeader("Allow", STOCK_ALLOW_HEADER);
  return res.status(204).end();
};

const createStock = (req, res) => {
  const { src, title, text } = req.body;

  if (!src || !title || !text) {
    return res.status(400).json({ error: "Поля src, title и text обязательны" });
  }

  const stock = stocksService.create({ src, title, text });
  return res.status(201).json(stock);
};

const updateStock = (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Некорректный id сервиса" });
  }

  const stock = stocksService.update(id, req.body);

  if (!stock) {
    return res.status(404).json({ error: "Сервис не найден" });
  }

  return res.json(stock);
};

const deleteStock = (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Некорректный id сервиса" });
  }

  const isRemoved = stocksService.remove(id);

  if (!isRemoved) {
    return res.status(404).json({ error: "Сервис не найден" });
  }

  return res.status(204).send();
};

module.exports = {
  getAllStocks,
  getStockById,
  headAllStocks,
  headStockById,
  optionsStocks,
  optionsStockById,
  createStock,
  updateStock,
  deleteStock
};

