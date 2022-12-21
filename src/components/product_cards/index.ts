import { Product } from "../../types/interfaces";
import { products } from "../../data/data";
import { createMainButtons } from "../buttons/index";

const btnAdd = createMainButtons("add", "button_small-size", "btn-add");
const btnMore = createMainButtons("more", "button_small-size", "btn-more");

class ProductCard {
  data: Product;

  constructor(data: Product) {
    this.data = data;
  }

  card = document.createElement("div");
  render() {
    this.card.classList.add("product-card");

    const img = document.createElement("img");

    const buttons = document.createElement("div");
    buttons.classList.add("product-card_buttons");
    buttons.appendChild(btnAdd.cloneNode(true));
    buttons.appendChild(btnMore.cloneNode(true));

    img.setAttribute("src", this.data.mainImage);
    this.card.appendChild(img);
    this.card.appendChild(buttons);

    return this.card;
  }
}

function createCardsArea() {
  const colorsArr = ["#f2634c", "#b1c8f5", "#e4d536", "#8a70d4", "#f5b2d2"];
  const main = document.querySelector(".main");
  const cards_area = document.createElement("div");
  cards_area.classList.add("product-cards-area");

  for (let i = 0; i < products.length; i++) {
    const card = new ProductCard(products[i]);

    card.card.style.backgroundColor = colorsArr[(i % (colorsArr.length))];

    console.log((i % (colorsArr.length)));
    
    
    cards_area.appendChild(card.render());
  }

  main?.appendChild(cards_area);
}

createCardsArea();
