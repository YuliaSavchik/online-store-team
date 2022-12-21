import "./index.html";
import "./main.scss";
import "normalize.css";

import App from "./pages/app/index";

import "./components/product_cards/index";

const app = new App();
app.renderPage();
