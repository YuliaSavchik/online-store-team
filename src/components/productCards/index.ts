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

  createDescription() {
    const shadowDiv = document.createElement("div");
    shadowDiv.classList.add("product-card_shadow");

    const nameText = document.createElement("div");
    nameText.appendChild(document.createTextNode(`${this.data.name}`));
    nameText.style.fontWeight = "600";

    shadowDiv.append(
      nameText,
      document.createTextNode(`Material: ${this.data.material}`),
      document.createElement("br"),
      document.createTextNode(`Color: ${this.data.color}`),
      document.createElement("br"),
      document.createTextNode(`Price: ${String(this.data.price)}$`),
      document.createElement("br"),
      document.createTextNode(`Rating: ${String(this.data.rating)}/5`),
      document.createElement("br"),
      document.createTextNode(`Stock: ${String(this.data.stock)}`)
    );

    return shadowDiv;
  }
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
    this.card.appendChild(this.createDescription());

    return this.card;
  }
}

function createCardsArea() {
  const colorsArr = ["#f2634c", "#b1c8f5", "#e4d536", "#8a70d4", "#f5b2d2"];
  const main = document.querySelector(".main");
  const cardsArea = document.createElement("div");
  cardsArea.classList.add("product-cards-area");

  for (let i = 0; i < products.length; i++) {
    const card = new ProductCard(products[i]);

    card.card.style.backgroundColor = colorsArr[i % colorsArr.length];

    console.log(i % colorsArr.length);

    cardsArea.appendChild(card.render());
  }

  main?.appendChild(cardsArea);
}


//cards area
// createCardsArea();
