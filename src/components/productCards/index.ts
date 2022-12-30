import { IFilters, Product } from "../../types/interfaces";
import { products } from "../../data/data";
import { createMainButtons, createSortSelect } from "../buttons/index";
import { fillFiltersObj } from "../filters/index";

const btnAdd = createMainButtons("add", "button_small-size", "btn-add");
const btnMore = createMainButtons("more", "button_small-size", "btn-more");

class ProductCard {
  data: Product;

  constructor(data: Product) {
    this.data = data;
  }

  card: HTMLDivElement = document.createElement("div");

  createDescription() {
    const shadowDiv: HTMLDivElement = document.createElement("div");
    shadowDiv.classList.add("product-card_shadow");
    shadowDiv.setAttribute("data-idCard", `${this.data.id}`);

    const nameText: HTMLDivElement = document.createElement("div");
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

    const img: HTMLImageElement = document.createElement("img");

    const buttons: HTMLDivElement = document.createElement("div");
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

export const productsBlock: HTMLDivElement = document.createElement("div");
productsBlock.classList.add("products-block");

export const sortSelect: HTMLSelectElement = createSortSelect("select-sort");
sortSelect.addEventListener("change", fillFiltersObj);

export const cardsArea: HTMLDivElement = document.createElement("div");
cardsArea.classList.add("product-cards-area");

export const found: HTMLDivElement = document.createElement("div");
found.classList.add("found");

export function createCardsArea(filtersObj: IFilters) : void{
  const colorsArr: string[] = [
    "#f2634c",
    "#b1c8f5",
    "#e4d536",
    "#8a70d4",
    "#f5b2d2",
  ];

  cardsArea.innerHTML = "";

  let cardsArr: Product[] = [];
  for (let i = 0; i < products.length; i++) {
    cardsArr.push(products[i]);
  }

  //check filters
  if (filtersObj.device.length > 0) {
    cardsArr = cardsArr.filter((item) =>
      filtersObj.device.includes(item.device)
    );
  }
  if (filtersObj.material.length > 0) {
    cardsArr = cardsArr.filter((item) =>
      filtersObj.material.includes(item.material)
    );
  }
  if (filtersObj.color.length > 0) {
    cardsArr = cardsArr.filter((item) => filtersObj.color.includes(item.color));
  }

  //check sort
  if (sortSelect.options[1].selected) {
    cardsArr.sort((a, b) => a.price - b.price);
  } else if (sortSelect.options[2].selected) {
    cardsArr.sort((a, b) => b.price - a.price);
  } else if (sortSelect.options[3].selected) {
    cardsArr.sort((a, b) => a.rating - b.rating);
  } else if (sortSelect.options[4].selected) {
    cardsArr.sort((a, b) => b.rating - a.rating);
  }

  //create cards accordin to filter values
  for (let i = 0; i < cardsArr.length; i++) {
    const card: ProductCard = new ProductCard(cardsArr[i]);
    card.card.style.backgroundColor = colorsArr[i % colorsArr.length];
    cardsArea.appendChild(card.render());
  }

  if (cardsArea.style.gridTemplateColumns === "auto auto") {
    for (const elem of cardsArea.children) {
      elem.classList.add("two-col");
      for (const el of elem.children) {
        if (el.classList.contains("product-card_shadow")) {
          el.classList.add("two-col-shadow");
        }
        if (el.classList.contains("product-card_buttons")) {
          el.classList.add("two-col-btn-area");
          for (const btn of el.children) {
            if (btn.classList.contains("button")) {
              btn.classList.add("two-col-button");
            }
          }
        }
      }
    }
  }
  
  found.textContent = `Found: ${cardsArr.length}`;
  productsBlock.innerHTML = "";
  productsBlock.appendChild(cardsArea);
}
