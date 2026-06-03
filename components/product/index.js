export default class Product {
  constructor(parent, data) {
    this.parent = parent;
    this.data = data;
  }

  getHTML() {
    return `
      <article class="lab3-product">
        <div class="lab3-product-media">
          <img src="${this.data.image}" alt="${this.data.title}">
        </div>
        <div class="lab3-product-body">
          <h3>${this.data.title}</h3>
          <p>${this.data.description}</p>
          <ul class="lab3-product-meta">
            <li><strong>Зона:</strong> ${this.data.zone}</li>
            <li><strong>Срок:</strong> ${this.data.eta}</li>
            <li><strong>Риск:</strong> ${this.data.risk}</li>
          </ul>
        </div>
      </article>
    `;
  }

  render() {
    this.parent.innerHTML = this.getHTML();
  }
}
