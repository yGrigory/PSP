import ProductCard from "../../components/product-card/index.js";
import ProductPage from "../product/index.js";
import { getProducts } from "../../data/products.js";

export default class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  getData() {
    return getProducts();
  }

  get pageRoot() {
    return document.getElementById("lab3_main_page");
  }

  getHTML() {
    return `
      <section class="lab3-page" id="lab3_main_page">
        <p class="lab3-subtitle">Выберите сервис для просмотра полной информации</p>
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
    const productPage = new ProductPage(
      this.parent,
      productId,
      this.getData(),
      () => this.render()
    );
    productPage.render();
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("afterbegin", this.getHTML());

    const cardsRoot = document.getElementById("lab3_cards");
    this.getData().forEach((item) => {
      const card = new ProductCard(cardsRoot, item, this.clickCard.bind(this));
      card.render();
    });
  }
}
