import MainPage from "./pages/main/index.js";

const root = document.getElementById("lab3_root");

if (root) {
  const page = new MainPage(root);
  page.render();
}
