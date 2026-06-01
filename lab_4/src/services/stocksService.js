const { readData, writeData } = require("./fileService");

let stocksFilePath = "";
let stocks = [];

const init = (filePath) => {
  stocksFilePath = filePath;
  stocks = readData(stocksFilePath);
};

const saveStocks = () => {
  writeData(stocksFilePath, stocks);
};

const getNextId = () => {
  if (stocks.length === 0) {
    return 1;
  }

  return Math.max(...stocks.map((stock) => stock.id)) + 1;
};

const findAll = (title) => {
  if (!title) {
    return stocks;
  }

  const normalizedTitle = title.toLowerCase();
  return stocks.filter((stock) => stock.title.toLowerCase().includes(normalizedTitle));
};

const findById = (id) => stocks.find((stock) => stock.id === id);

const create = ({ src, title, text }) => {
  const stock = {
    id: getNextId(),
    src,
    title,
    text
  };

  stocks.push(stock);
  saveStocks();
  return stock;
};

const update = (id, data) => {
  const stock = findById(id);

  if (!stock) {
    return null;
  }

  if (data.src !== undefined) {
    stock.src = data.src;
  }

  if (data.title !== undefined) {
    stock.title = data.title;
  }

  if (data.text !== undefined) {
    stock.text = data.text;
  }

  saveStocks();
  return stock;
};

const remove = (id) => {
  const stockIndex = stocks.findIndex((stock) => stock.id === id);

  if (stockIndex === -1) {
    return false;
  }

  stocks.splice(stockIndex, 1);
  saveStocks();
  return true;
};

module.exports = {
  init,
  findAll,
  findById,
  create,
  update,
  remove
};

