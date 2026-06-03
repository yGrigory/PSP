import MainPage from "./pages/main/index.js";

const root = document.getElementById("lab3_root");
const backendOrigin = "http://localhost:3000";
const corsDemoUrl = `${backendOrigin}/stocks?cors_demo=${Date.now()}`;

console.info(`Lab 5 frontend origin: ${window.location.origin}`);
console.info(`Lab 5 backend origin: ${backendOrigin}`);
console.info(`Lab 5 CORS demo XHR: ${corsDemoUrl}`);

if (window.location.origin === backendOrigin) {
  console.warn(
    "CORS will not appear because frontend is opened from the same origin as backend. " +
      "Open lab_5 through Live Server, for example http://127.0.0.1:5500/lab_5/index.html."
  );
}

const corsDemoXhr = new XMLHttpRequest();
corsDemoXhr.open("GET", corsDemoUrl);
corsDemoXhr.onload = () => {
  console.warn(
    "CORS demo request was not blocked. Check that CORS Unblock is disabled and lab_4 server was restarted."
  );
};
corsDemoXhr.onerror = () => {
  console.error("CORS demo error: XMLHttpRequest was blocked by browser CORS policy.");
};
corsDemoXhr.send();

if (root) {
  const page = new MainPage(root);
  page.render();
}
