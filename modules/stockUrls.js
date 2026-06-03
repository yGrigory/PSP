class StockUrls {
  constructor() {
    this.baseUrl = "";
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
