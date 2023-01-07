import { IFilters, Product } from "../../types/interfaces";
import { products } from "../../data/data";
import { createMainButtons, createSortSelect } from "../buttons/index";
import {
  createFilterBlock,
  CreateObjWithFilters,
  UpdateURL,
} from "../filters/index";
import { createSearchInput } from "../inputs/index";
import { target } from "../noUiSlider/nouislider";

const btnAdd = createMainButtons("add", "button_small-size", "btn-add");
const btnMore = createMainButtons("more", "button_small-size", "btn-more");

const prodNotFound = document.createElement("div");
prodNotFound.classList.add("product-not-found");
prodNotFound.appendChild(document.createTextNode("Product not found"));

export const productsBlock: HTMLDivElement = document.createElement("div");
productsBlock.classList.add("products-block");

export const sortSelect: HTMLSelectElement = createSortSelect("select-sort");
sortSelect.addEventListener("change", (event) => {
  UpdateURL.changeURL();
  CreateObjWithFilters.fillFiltersObj(event);
});

export const cardsArea: HTMLDivElement = document.createElement("div");
cardsArea.classList.add("product-cards-area");

export const found: HTMLDivElement = document.createElement("div");
found.classList.add("found");

export const searchInput = createSearchInput();
searchInput.addEventListener("input", () => {
  UpdateURL.changeURL();
  CreateCardsArea.render();
});

export const addFilterBlock: HTMLElement = createFilterBlock();

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
    btnAdd.setAttribute("data-idbtn", `${this.data.id}`);
    btnMore.setAttribute("data-idcard", `${this.data.id}`);
    buttons.appendChild(btnAdd.cloneNode(true));
    buttons.appendChild(btnMore.cloneNode(true));

    img.setAttribute("src", this.data.mainImage);
    this.card.appendChild(img);
    this.card.appendChild(buttons);
    this.card.appendChild(this.createDescription());

    return this.card;
  }
}

export class CreateCardsArea {
  static render(): void {
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
    cardsArr = this.checkFilters(cardsArr, CreateObjWithFilters.filtersObj);

    //check search
    cardsArr = this.checkSearch(cardsArr);

    //check sort
    cardsArr = this.checkSort(cardsArr);

    //create cards accordin to filter values
    for (let i = 0; i < cardsArr.length; i++) {
      const card: ProductCard = new ProductCard(cardsArr[i]);
      card.card.style.backgroundColor = colorsArr[i % colorsArr.length];
      cardsArea.appendChild(card.render());
    }

    // card display type
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

    found.textContent = `Found: ${cardsArea.children.length}`;

    if (cardsArea.children.length < 1) {
      cardsArea.appendChild(prodNotFound);
    }

    productsBlock.innerHTML = "";
    productsBlock.appendChild(cardsArea);
  }

  static checkFilters(cardsArr: Product[], filtersObj: IFilters) {
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
      cardsArr = cardsArr.filter((item) =>
        filtersObj.color.includes(item.color)
      );
    }
    cardsArr = cardsArr.filter(
      (item) => item.price >= Number(localStorage.getItem("sliderMinPrice"))
    );
    cardsArr = cardsArr.filter(
      (item) => item.price <= Number(localStorage.getItem("sliderMaxPrice"))
    );
    cardsArr = cardsArr.filter(
      (item) => item.stock >= Number(localStorage.getItem("sliderMinStock"))
    );
    cardsArr = cardsArr.filter(
      (item) => item.stock <= Number(localStorage.getItem("sliderMaxStock"))
    );

    return cardsArr;
  }

  static checkSearch(cardsArr: Product[]) {
    cardsArr = cardsArr.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(searchInput.value.toLowerCase().trim()) ||
        item.device
          .toLowerCase()
          .includes(searchInput.value.toLowerCase().trim()) ||
        item.description
          .toLowerCase()
          .includes(searchInput.value.toLowerCase().trim()) ||
        item.material
          .toLowerCase()
          .includes(searchInput.value.toLowerCase().trim()) ||
        `color ${item.color.toLowerCase()}`.includes(
          searchInput.value.toLowerCase().trim()
        ) ||
        `${item.price.toString().toLowerCase()}$`.includes(
          searchInput.value.toLowerCase().trim()
        ) ||
        item.stock
          .toString()
          .toLowerCase()
          .includes(searchInput.value.toLowerCase().trim()) ||
        `${item.rating.toString().toLowerCase()}/5`.includes(
          searchInput.value.toLowerCase().trim()
        )
    );

    return cardsArr;
  }

  static checkSort(cardsArr: Product[]) {
    if (sortSelect.options[1].selected) {
      cardsArr.sort((a, b) => a.price - b.price);
    } else if (sortSelect.options[2].selected) {
      cardsArr.sort((a, b) => b.price - a.price);
    } else if (sortSelect.options[3].selected) {
      cardsArr.sort((a, b) => a.rating - b.rating);
    } else if (sortSelect.options[4].selected) {
      cardsArr.sort((a, b) => b.rating - a.rating);
    }

    return cardsArr;
  }

  static reset(filtersObj: IFilters) {
    filtersObj.color = [];
    filtersObj.device = [];
    filtersObj.material = [];
    searchInput.value = "";

    const filters = addFilterBlock.getElementsByTagName("*");

    for (const child of filters) {
      if (child instanceof HTMLInputElement) {
        child.checked = false;
      }
    }

    const rangePrice: target = document.querySelector(
      ".range-slider__range-price"
    ) as target;
    const minValuePrice = document.querySelector(
      ".value_min-price"
    ) as HTMLElement;
    const maxValuePrice = document.querySelector(
      ".value_max-price"
    ) as HTMLElement;
    

    const rangeStock: target = document.querySelector(
      ".range-slider__range-stock"
    ) as target;
    const minValueStock = document.querySelector(
      ".value_min-stock"
    ) as HTMLElement;
    const maxValueStock = document.querySelector(
      ".value_max-stock"
    ) as HTMLElement;

    const inputsValuePrice = [minValuePrice, maxValuePrice];
    const inputsValueStock = [minValueStock, maxValueStock];

    rangePrice.noUiSlider?.set([5, 100]);
    inputsValuePrice[0].innerHTML = "5$";
    inputsValuePrice[1].innerHTML = "100$";

    rangeStock.noUiSlider?.set([1, 100]);
    inputsValueStock[0].innerHTML = "1";
    inputsValueStock[1].innerHTML = "100";

    this.render();

    window.location.hash = "#main-page";
  }
}
