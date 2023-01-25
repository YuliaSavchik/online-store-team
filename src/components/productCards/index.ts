import {
  DeviceCount,
  IFilters,
  MaterialCount,
  Product,
} from "../../types/interfaces";
import { products } from "../../data/data";
import {
  btnViewTwoColums,
  createMainButtons,
  createSortSelect,
} from "../buttons/index";
import {
  addFilterBlock,
  CreateObjWithFilters,
  UpdateURL,
} from "../filters/index";
import { createSearchInput } from "../inputs/index";

import { Device, Material } from "../../types/enums";

import { productsInCart } from "../../pages/app/index";
import { changePriceSlider, changeStockSlider } from "../changeSliders";

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
  localStorage.setItem("link", window.location.hash);
  CreateObjWithFilters.fillFiltersObj(event);
});

export const cardsArea: HTMLDivElement = document.createElement("div");
cardsArea.classList.add("product-cards-area");

export const found: HTMLDivElement = document.createElement("div");
found.classList.add("found");

export const searchInput = createSearchInput();
searchInput.addEventListener("input", () => {
  UpdateURL.changeURL();
  localStorage.setItem("link", window.location.hash);
  CreateCardsArea.render();
});

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
    const buttonsAddRemoveBox: HTMLDivElement = document.createElement("div");
    buttonsAddRemoveBox.classList.add("btn-box");
    buttonsAddRemoveBox.classList.add(`btn-box-${this.data.id}`);
    buttonsAddRemoveBox.setAttribute("id", `${this.data.id}`);
    btnAdd.setAttribute("data-idbtn", `${this.data.id}`);
    const btnRemove = createMainButtons(
      "remove",
      "button_small-size",
      "btn-remove"
    );
    btnRemove.setAttribute("data-idbtn", `${this.data.id}`);
    if (productsInCart.length > 0) {
      const result = productsInCart.findIndex(
        (product) => product.id === this.data.id
      );
      if (result === -1) {
        buttonsAddRemoveBox.innerHTML = "";
        buttonsAddRemoveBox.append(btnAdd.cloneNode(true));
      } else {
        buttonsAddRemoveBox.innerHTML = "";
        buttonsAddRemoveBox.append(btnRemove.cloneNode(true));
      }
    } else {
      buttonsAddRemoveBox.innerHTML = "";
      buttonsAddRemoveBox.append(btnAdd.cloneNode(true));
    }
    btnMore.setAttribute("data-idcard", `${this.data.id}`);
    buttons.append(buttonsAddRemoveBox.cloneNode(true));
    buttons.append(btnMore.cloneNode(true));

    img.setAttribute("src", this.data.mainImage);
    this.card.appendChild(img);
    this.card.appendChild(buttons);
    this.card.appendChild(this.createDescription());

    return this.card;
  }
}

const deviceArr: DeviceCount = {
  i_12: 0,
  ip_12: 0,
  i_13_14: 0,
  ip_13: 0,
  ip_14: 0,
};

const materialArr: MaterialCount = {
  recycled: 0,
  bamboo: 0,
  leather: 0,
};

function resetCount() {
  deviceArr.i_12 = 0;
  deviceArr.ip_12 = 0;
  deviceArr.i_13_14 = 0;
  deviceArr.ip_13 = 0;
  deviceArr.ip_14 = 0;
  materialArr.recycled = 0;
  materialArr.bamboo = 0;
  materialArr.leather = 0;
}

export function writeCount(str: string, num: number) {
  const filters = addFilterBlock.getElementsByTagName("*");
  for (const child of filters) {
    if (child instanceof HTMLLabelElement) {
      if (child.innerHTML === str) {
        const count = child.nextSibling;
        if (count instanceof HTMLDivElement) {
          count.innerHTML = String(num);
        }
      }
    }
  }
}

function checkCount(cardsArr: Product[]) {
  for (let i = 0; i < cardsArr.length; i++) {
    if (cardsArr[i].device === Device.i_12) deviceArr.i_12++;
    if (cardsArr[i].device === Device.ip_12) deviceArr.ip_12++;
    if (cardsArr[i].device === Device.i_13_14) deviceArr.i_13_14++;
    if (cardsArr[i].device === Device.ip_13) deviceArr.ip_13++;
    if (cardsArr[i].device === Device.ip_14) deviceArr.ip_14++;
    if (cardsArr[i].material === Material.recycled) materialArr.recycled++;
    if (cardsArr[i].material === Material.bamboo) materialArr.bamboo++;
    if (cardsArr[i].material === Material.leather) materialArr.leather++;
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

    //check slider
    cardsArr = this.checkSlider(cardsArr);

    priceArr.length = 0;
    stockArr.length = 0;

    resetCount();
    checkCount(cardsArr);
    //create cards accordin to filter values
    for (let i = 0; i < cardsArr.length; i++) {
      priceArr.push(cardsArr[i].price);
      stockArr.push(cardsArr[i].stock);

      writeCount(Device.i_12, deviceArr.i_12);
      writeCount(Device.ip_12, deviceArr.ip_12);
      writeCount(Device.i_13_14, deviceArr.i_13_14);
      writeCount(Device.ip_13, deviceArr.ip_13);
      writeCount(Device.ip_14, deviceArr.ip_14);

      writeCount(Material.recycled, materialArr.recycled);
      writeCount(Material.bamboo, materialArr.bamboo);
      writeCount(Material.leather, materialArr.leather);

      const card: ProductCard = new ProductCard(cardsArr[i]);
      card.card.style.backgroundColor = colorsArr[i % colorsArr.length];
      cardsArea.appendChild(card.render());
    }

    //check view
    if (
      window.innerWidth > 1000 &&
      btnViewTwoColums.classList.contains("checked")
    ) {
      cardsArea.style.gap = "70px";
      cardsArea.style.padding = "60px";
      for (const child of cardsArea.children) {
        if (child instanceof HTMLDivElement)
          child.style.transform = "scale(1.2)";
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
    return cardsArr;
  }

  static checkSlider(cardsArr: Product[]) {
    const priceMin = Number(localStorage.getItem("sliderMinPrice"));
    const priceMax = Number(localStorage.getItem("sliderMaxPrice"));
    const stockMin = Number(localStorage.getItem("sliderMinStock"));
    const stockMax = Number(localStorage.getItem("sliderMaxStock"));

    cardsArr = cardsArr.filter((item) => item.price >= priceMin);
    cardsArr = cardsArr.filter((item) => item.price <= priceMax);
    cardsArr = cardsArr.filter((item) => item.stock >= stockMin);
    cardsArr = cardsArr.filter((item) => item.stock <= stockMax);

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

    changePriceSlider(5, 100);
    changeStockSlider(1, 100);

    this.render();

    localStorage.setItem("link", "#main-page");
    window.location.hash = "#main-page";
  }
}

export const priceArr: number[] = [];
export const stockArr: number[] = [];
