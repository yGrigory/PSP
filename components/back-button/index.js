export default class BackButton {
  constructor(parent, onClick) {
    this.parent = parent;
    this.onClick = onClick;
  }

  render() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "site-btn lab3-back-btn";
    button.textContent = "Назад";
    button.onclick = this.onClick;
    this.parent.appendChild(button);
  }
}
