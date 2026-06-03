export default class ProductCard {
  constructor(parent, data, onClick) {
    this.parent = parent;
    this.data = data;
    this.onClick = onClick;
  }

  getHTML() {
    return `
      <article class="lab3-card" data-product-id="${this.data.id}">
        <div class="lab3-card-media">
          <img src="${this.data.image}" alt="${this.data.title}">
        </div>
        <div class="lab3-card-body">
          <h3>${this.data.title}</h3>
          <p>${this.data.short}</p>
          <button class="site-btn lab3-open-btn" type="button">Открыть</button>
        </div>
      </article>
    `;
  }

  render() {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    const node = this.parent.lastElementChild;
    node?.addEventListener("click", this.onClick);
  }
}
