import ProductCard from "../../components/product-card/index.js";
import ProductPage from "../product/index.js";
import { getProducts } from "../../data/products.js";
import { calculateEscortIntervalGcd, compressIceReportRle } from "../../services/iceHomework.js";

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
    const escortScheduleMinutes = [180, 240, 300, 420];
    const escortGcd = calculateEscortIntervalGcd(...escortScheduleMinutes);

    const iceReportText = "ССССММЛЛЛЛСССМ";
    const compressedIceReport = compressIceReportRle(iceReportText);

    const escortDispatchAccount = {
      account_number: "SMP-ICE-2046",
      dispatch_zone: "Карское море",
      report_text: iceReportText
    };

    return `
      <section class="lab3-page" id="lab3_main_page">
        <p class="lab3-subtitle">Выберите сервис для просмотра полной информации</p>
        <article class="lab3-homework-box">
          <h3>Домашнее задание: алгоритмы в тематике СМП</h3>
          <p><strong>Аккаунт диспетчера:</strong> ${escortDispatchAccount.account_number}</p>
          <p><strong>Зона:</strong> ${escortDispatchAccount.dispatch_zone}</p>
          <p><strong>НОД интервалов проводки (${escortScheduleMinutes.join(", ")}):</strong> ${escortGcd} мин.</p>
          <p><strong>RLE-сжатие ледового отчёта (${escortDispatchAccount.report_text}):</strong> ${compressedIceReport}</p>
        </article>
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
