import ProductModel from "./components/product-model/index.js";

const root = document.getElementById("model_root");

if (root) {
  const productModel = new ProductModel(root);
  productModel.render();
}
