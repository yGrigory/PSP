import BackButton from "../../components/back-button/index.js";
import Product from "../../components/product/index.js";

export default class ProductPage {
  constructor(parent, id, products, onBack) {
    this.parent = parent;
    this.id = id;
    this.products = products;
    this.onBack = onBack;
  }

  getData() {
    return this.products.find((item) => item.id === this.id) || null;
  }

  get pageRoot() {
    return document.getElementById("lab3_product_page");
  }

  getHTML() {
    return `
      <section class="lab3-page" id="lab3_product_page">
        <div class="lab3-product-header">
          <div id="lab3_back_button"></div>
          <h3>Детали сервиса</h3>
        </div>
        <div id="lab3_product_root"></div>
      </section>
    `;
  }

  renderNotFound() {
    this.parent.innerHTML = `
      <section class="lab3-page">
        <p>Запись не найдена.</p>
      </section>
    `;
  }

  render() {
    const data = this.getData();
    if (!data) {
      this.renderNotFound();
      return;
    }

    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("afterbegin", this.getHTML());

    const backButtonRoot = document.getElementById("lab3_back_button");
    const backButton = new BackButton(backButtonRoot, this.onBack);
    backButton.render();

    const productRoot = document.getElementById("lab3_product_root");
    const product = new Product(productRoot, data);
    product.render();
  }
}
