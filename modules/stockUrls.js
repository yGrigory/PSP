class StockUrls {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  withCacheBuster(url) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}_=${Date.now()}`;
  }

  getStocks() {
    return this.withCacheBuster(`${this.baseUrl}/stocks`);
  }

  getStockById(id) {
    return this.withCacheBuster(`${this.baseUrl}/stocks/${id}`);
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
