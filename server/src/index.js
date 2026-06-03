const path = require("path");
const express = require("express");
const stocksRouter = require("./routes/stocks");
const stocksService = require("./services/stocksService");

const app = express();
const PORT = 3000;
const STOCKS_FILE_PATH = path.join(__dirname, "data", "stocks.json");
const PUBLIC_PATH = path.join(__dirname, "..", "public");

stocksService.init(STOCKS_FILE_PATH);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/stocks", stocksRouter);
app.use(express.static(PUBLIC_PATH));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/stocks")) {
    return next();
  }

  return res.sendFile(path.join(PUBLIC_PATH, "index.html"), (error) => {
    if (error) {
      res.status(404).json({
        error: "Frontend build не найден. Выполните npm run build."
      });
    }
  });
});

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

