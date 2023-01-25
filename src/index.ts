import "./index.html";
import "./main.scss";
import "normalize.css";

import App from "./pages/app/index";

import { allDescMark } from "./ourMark";

const app = new App();
app.renderPage();

console.log(allDescMark);
