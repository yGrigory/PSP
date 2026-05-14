const fs = require("fs");

const readData = (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const normalized = raw.replace(/^\uFEFF/, "");
    return JSON.parse(normalized);
  } catch (err) {
    console.error("Ошибка чтения файла:", err);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Ошибка записи файла:", err);
  }
};

module.exports = {
  readData,
  writeData
};
