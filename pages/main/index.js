import ProductCard from "../../components/product-card/index.js";
import ProductPage from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { mapStockToService } from "../../modules/stockMapper.js";

export default class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.items = [];
  }

  getData() {
    ajax.get(stockUrls.getStocks(), (data, status) => {
      if (status !== 200 || !Array.isArray(data)) {
        this.renderError("Не удалось загрузить сервисы из API ЛР4.");
        return;
      }

      this.items = data.map(mapStockToService);
      this.renderData(this.items);
    });
  }

  get pageRoot() {
    return document.getElementById("lab3_main_page");
  }

  getHTML() {
    return `
      <section class="lab3-page" id="lab3_main_page">
        <p class="lab3-subtitle">Карточки ниже загружаются AJAX-запросом из API ЛР4.</p>
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

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("afterbegin", this.getHTML());

    const cardsRoot = document.getElementById("lab3_cards");
    cardsRoot.innerHTML = '<p class="lab3-status">Загрузка сервисов из API...</p>';
    this.getData();
  }
}
