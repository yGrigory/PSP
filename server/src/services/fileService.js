const fs = require("fs");

const readData = (filePath) => {
  try {
    const rawData = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Ошибка чтения файла:", error.message);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Ошибка записи файла:", error.message);
  }
};

module.exports = {
  readData,
  writeData
};

