import BackButton from "../../components/back-button/index.js";
import Product from "../../components/product/index.js";
import ProductModel from "../../components/product-model/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { mapStockToService } from "../../modules/stockMapper.js";

export default class ProductPage {
  constructor(parent, id, onBack) {
    this.parent = parent;
    this.id = id;
    this.onBack = onBack;
  }

  getData() {
    ajax.get(stockUrls.getStockById(this.id), (data, status) => {
      if (status !== 200 || !data) {
        this.renderNotFound();
        return;
      }

      this.renderData(mapStockToService(data));
    });
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

  async renderData(data) {
    const productRoot = document.getElementById("lab3_product_root");
    productRoot.innerHTML = "";

    const product = new Product(productRoot, data);
    product.render();

    const productBody = productRoot.querySelector(".lab3-product-body");
    if (productBody) {
      const productModel = new ProductModel(productBody);
      await productModel.render();
    }
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("afterbegin", this.getHTML());

    const backButtonRoot = document.getElementById("lab3_back_button");
    const backButton = new BackButton(backButtonRoot, this.onBack);
    backButton.render();

    const productRoot = document.getElementById("lab3_product_root");
    productRoot.innerHTML = '<p class="lab3-status">Загрузка карточки из API...</p>';

    this.getData();
  }
}

