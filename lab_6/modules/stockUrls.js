class StockUrls {
  constructor() {
    this.baseUrl = window.location.port === "3000" ? "" : "http://localhost:3000";
  }

  getStocks() {
    return `${this.baseUrl}/stocks`;
  }

  getStockById(id) {
    return `${this.baseUrl}/stocks/${id}`;
  }

  createStock() {
    return `${this.baseUrl}/stocks`;
  }

  removeStockById(id) {
    return `${this.baseUrl}/stocks/${id}`;
  }

  updateStockById(id) {
    return `${this.baseUrl}/stocks/${id}`;
  }
}

export const stockUrls = new StockUrls();
