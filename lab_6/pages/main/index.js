import ProductCard from "../../components/product-card/index.js";
import ProductPage from "../product/index.js";
import { api } from "../../modules/api.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { mapStockToService } from "../../modules/stockMapper.js";

export default class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.items = [];
  }

  async getData() {
    const data = await api.get(stockUrls.getStocks());
    this.items = data.map(mapStockToService);
    return this.items;
  }

  get pageRoot() {
    return document.getElementById("lab3_main_page");
  }

  getHTML() {
    return `
      <section class="lab3-page" id="lab3_main_page">
        <p class="lab3-subtitle">Карточки ниже загружаются через fetch API и Promise.</p>
        <div class="lab3-grid" id="lab3_cards"></div>
      </section>
    `;
  }

  clickCard(event) {
    const card = event.target.closest("[data-product-id]");
    if (!card) {
      return;
    }

    const productId = Number(card.dataset.productId);
    const productPage = new ProductPage(this.parent, productId, () => this.render());
    productPage.render();
  }

  renderData(items) {
    const cardsRoot = document.getElementById("lab3_cards");
    if (!cardsRoot) {
      return;
    }

    cardsRoot.innerHTML = "";

    items.forEach((item) => {
      const card = new ProductCard(cardsRoot, item, this.clickCard.bind(this));
      card.render();
    });
  }

  renderError(message) {
    const cardsRoot = document.getElementById("lab3_cards");
    if (cardsRoot) {
      cardsRoot.innerHTML = `<p class="lab3-status">${message}</p>`;
    }
  }

  async render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("afterbegin", this.getHTML());

    const cardsRoot = document.getElementById("lab3_cards");
    cardsRoot.innerHTML = '<p class="lab3-status">Загрузка сервисов через fetch...</p>';

    try {
      const items = await this.getData();
      this.renderData(items);
    } catch (error) {
      console.error(error);
      this.renderError("Не удалось загрузить сервисы из API.");
    }
  }
}

