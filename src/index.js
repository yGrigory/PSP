const path = require("path");
const express = require("express");
const stocksRouter = require("./routes/stocks");
const stocksService = require("./services/stocksService");

const app = express();
const PORT = 3000;
const STOCKS_FILE_PATH = path.join(__dirname, "data", "stocks.json");

stocksService.init(STOCKS_FILE_PATH);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Express сервер лабораторной работы 4 работает");
});

app.use("/stocks", stocksRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
  });
}

module.exports = app;
