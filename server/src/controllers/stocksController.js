const stocksService = require("../services/stocksService");

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
  createStock,
  updateStock,
  deleteStock
};

