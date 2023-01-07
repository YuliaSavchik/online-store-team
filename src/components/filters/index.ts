import { products } from "../../data/data";
import { Color, Device, Material } from "../../types/enums";
import { IFilters } from "../../types/interfaces";
import {
  btnViewThreeColums,
  btnViewTwoColums,
  createArrowButtons,
} from "../buttons/index";
import { target } from "../noUiSlider/nouislider";
import {
  CreateCardsArea,
  addFilterBlock,
  sortSelect,
  searchInput,
  cardsArea,
} from "../productCards/index";

const btnArrowTop = createArrowButtons("button-arrow_top");

class Filter {
  items: string[];
  title: string;

  constructor(title: string, items: string[]) {
    this.title = title;
    this.items = items;
  }

  filter: HTMLDivElement = document.createElement("div");
  arrow: HTMLSpanElement = document.createElement("span");
  filterHeader: HTMLDivElement = document.createElement("div");
  checkboxField: HTMLDivElement = document.createElement("div");
  form: HTMLFormElement = document.createElement("form");

  render() {
    this.filter.classList.add("filter");

    this.filterHeader.classList.add("filter-header");

    this.filterHeader.innerHTML = `<span>${this.title.toUpperCase()}</span>`;

    this.arrow.appendChild(btnArrowTop.cloneNode(true));
    this.arrow.classList.add("arrow");
    this.filterHeader.appendChild(this.arrow);

    this.filter.appendChild(this.filterHeader);

    this.checkboxField.classList.add("checkbox-field");

    this.createElements();

    this.checkboxField.appendChild(this.form);
    this.filter.appendChild(this.checkboxField);

    this.arrow.addEventListener("click", () => {
      this.arrow.classList.toggle("rotate");
      this.filter.classList.toggle("collapsible");
    });

    return this.filter;
  }

  createElements() {
    for (let i = 0; i < this.items.length; i++) {
      const checkbox: HTMLInputElement = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", `${this.title}-checkbox-${i}`);
      checkbox.classList.add("checkbox");
      this.form.appendChild(checkbox);
      const label: HTMLLabelElement = document.createElement("label");
      label.setAttribute("for", `${this.title}-checkbox-${i}`);
      label.classList.add("label");
      label.innerHTML = this.items[i];
      this.form.appendChild(label);
    }
  }
}

class ColorFilter extends Filter {
  colorHash = new Map<string, string>([
    ["red", "#CA1F1F"],
    ["orange", "#F18F48"],
    ["yellow", "#F2E90F"],
    ["blue", "#91B7F0"],
    ["green", "#76B56C"],
    ["purple", "#C97EEC"],
    ["pink", "#E86DB7"],
    ["black", "#000000"],
  ]);

  render() {
    super.render();

    this.filter.classList.add("color-filter");

    this.form.classList.add("color-form");
    return this.filter;
  }
  createElements(): void {
    for (let i = 0; i < this.items.length; i++) {
      const checkbox: HTMLInputElement = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", `${this.title}-checkbox-${i}`);
      checkbox.classList.add("checkbox");

      this.form.appendChild(checkbox);
      const label: HTMLLabelElement = document.createElement("label");

      label.setAttribute("for", `${this.title}-checkbox-${i}`);
      label.classList.add("color-label");

      const colorCircle: HTMLDivElement = document.createElement("div");

      colorCircle.style.backgroundColor =
        this.colorHash.get(this.items[i]) ?? "white";

      colorCircle.classList.add("color-circle");

      label.appendChild(colorCircle);
      label.appendChild(document.createTextNode(this.items[i]));
      this.form.appendChild(label);
    }
  }
}

export class CreateObjWithFilters {
  static filtersObj: IFilters = {
    device: [],
    material: [],
    color: [],
  };

  static addFiltersToArr(
    arr: string[],
    str: string,
    target: HTMLInputElement,
    label: string | null | undefined
  ): void {
    if (label && label === str && !arr.includes(label) && target.checked) {
      arr.push(label);
    } else if (label && arr.includes(label) && !target.checked) {
      arr.splice(arr.indexOf(label), 1);
    }
  }

  static fillFiltersObj(event: Event): void {
    const target: EventTarget | null = event.target;

    if (target && target instanceof HTMLInputElement) {
      const label = document.querySelector(`label[for="${target.id}"]`);
      const labelToString: string | null | undefined =
        label?.lastChild?.textContent;

      for (let i = 0; i < products.length; i++) {
        this.addFiltersToArr(
          this.filtersObj.device,
          products[i].device,
          target,
          labelToString
        );
        this.addFiltersToArr(
          this.filtersObj.material,
          products[i].material,
          target,
          labelToString
        );
        this.addFiltersToArr(
          this.filtersObj.color,
          products[i].color,
          target,
          labelToString
        );
      }
      UpdateURL.changeURL();
    }
    return CreateCardsArea.render();
  }
}

export function createFilterBlock(): HTMLElement {
  const filterBlock: HTMLElement = document.createElement("div");

  window.addEventListener("DOMContentLoaded", () => {
    const deviceFilter = new Filter("device", [
      Device.i_12,
      Device.ip_12,
      Device.i_13_14,
      Device.ip_13,
      Device.ip_14,
    ]);

    const materialFilter = new Filter("material", [
      Material.bamboo,
      Material.leather,
      Material.recycled,
    ]);

    const colorFilter = new ColorFilter("color", [
      Color.red,
      Color.orange,
      Color.yellow,
      Color.blue,
      Color.green,
      Color.purple,
      Color.pink,
      Color.black,
    ]);

    filterBlock.append(
      deviceFilter.render(),
      materialFilter.render(),
      colorFilter.render()
    );
  });

  filterBlock.addEventListener("click", (event: Event) => {
    CreateObjWithFilters.fillFiltersObj(event);
  });

  return filterBlock;
}

window.addEventListener("load", (event) => {
  RenderContentByURL.render(window.location.hash, event);
});

window.addEventListener("hashchange", (event) => {
  RenderContentByURL.render(window.location.hash, event);
});

class RenderContentByURL {
  static hashTypes: Record<string, string> = {
    device: "",
    material: "",
    color: "",
    sort: "",
    input: "",
    price: "",
    stock: "",
    view: "",
  };

  static checkSort(hash: string) {
    const sort = sortSelect.getElementsByTagName("*");
    for (const child of sort) {
      if (child instanceof HTMLOptionElement) {
        if (
          hash.includes(child.innerHTML.replace(/ /g, "_")) &&
          hash.includes("sort")
        ) {
          child.selected = true;
        } else {
          if (child.innerHTML === "SORT BY") {
            child.selected = true;
          }
        }
      }
    }
  }

  static checkSlider(hash: string) {
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

    if (hash.includes("price")) {
      const inputsValuePrice = [minValuePrice, maxValuePrice];

      const minPrice = this.hashTypes.price.split("%E2%86%95")[0];
      const maxPrice = this.hashTypes.price.split("%E2%86%95")[1];

      rangePrice.noUiSlider?.set([minPrice, maxPrice]);
      inputsValuePrice[0].innerHTML = `${localStorage.getItem(
        "sliderMinPrice"
      )}$`;
      inputsValuePrice[1].innerHTML = `${localStorage.getItem(
        "sliderMaxPrice"
      )}$`;
    } else {
      const inputsValuePrice = [minValuePrice, maxValuePrice];

      rangePrice.noUiSlider?.set([5, 100]);
      inputsValuePrice[0].innerHTML = `5$`;
      inputsValuePrice[1].innerHTML = `100$`;
    }

    if (hash.includes("stock")) {
      const inputsValueStock = [minValueStock, maxValueStock];

      const minStock = this.hashTypes.stock.split("%E2%86%95")[0];
      const maxStock = this.hashTypes.stock.split("%E2%86%95")[1];

      rangeStock.noUiSlider?.set([minStock, maxStock]);
      inputsValueStock[0].innerHTML = `${localStorage.getItem(
        "sliderMinStock"
      )}`;
      inputsValueStock[1].innerHTML = `${localStorage.getItem(
        "sliderMaxStock"
      )}`;
    } else {
      const inputsValueStock = [minValueStock, maxValueStock];

      rangeStock.noUiSlider?.set([1, 100]);
      inputsValueStock[0].innerHTML = `1`;
      inputsValueStock[1].innerHTML = `100`;
    }
  }

  static checkFilters(hash: string): void {
    const filtersBlock = addFilterBlock.getElementsByTagName("*");

    for (const child of filtersBlock) {
      if (child instanceof HTMLInputElement) {
        const label = document.querySelector(`label[for="${child.id}"]`);
        const labelToString: string | null | undefined =
          label?.lastChild?.textContent;

        if (
          labelToString &&
          hash.includes(labelToString.replace(/ /g, "_")) &&
          hash.includes(child.id.split("-")[0])
        ) {
          child.checked = true;
        } else {
          child.checked = false;
        }
      }
    }

    const URL = hash.split("/")[1].split("|");

    const filters: Record<string, string> = {
      device: "",
      material: "",
      color: "",
    };

    URL.forEach((item) => {
      const [key, value] = item.split("=");
      filters[key] = value;
    });

    const deviceArr = filters.device ? filters.device.split("&") : [];
    const materialArr = filters.material ? filters.material.split("&") : [];
    const colorArr = filters.color ? filters.color.split("&") : [];

    CreateObjWithFilters.filtersObj.device = deviceArr.map((item) =>
      item.replace(/_/g, " ")
    );
    CreateObjWithFilters.filtersObj.material = materialArr.map((item) =>
      item.replace(/_/g, " ")
    );
    CreateObjWithFilters.filtersObj.color = colorArr.map((item) =>
      item.replace(/_/g, " ")
    );
  }

  static render(hash: string, event: Event): void {
    const URL = hash.split("/")[1];
    const URLSplit: string[] = URL.includes("|") ? URL.split("|") : [URL];

    URLSplit.forEach((item) => {
      const [key, value] = item.split("=");
      this.hashTypes[key] = value;
    });

    //check view
    if (this.hashTypes.view.includes("column") || !hash.includes("view")) {
      btnViewTwoColums.classList.remove("checked");
      btnViewThreeColums.classList.add("checked");
      cardsArea.style.gridTemplateColumns = "auto auto auto";
    } else {
      btnViewThreeColums.classList.remove("checked");
      btnViewTwoColums.classList.add("checked");
      cardsArea.style.gridTemplateColumns = "auto auto";
    }

    //check filters
    this.checkFilters(hash);

    //check sort
    this.checkSort(hash);

    //check input
    if (hash.includes("input")) {
      searchInput.value = this.hashTypes.input.replace(/%20/g, " ");
    } else {
      searchInput.value = "";
    }

    //check slider
    this.checkSlider(hash);

    CreateObjWithFilters.fillFiltersObj(event);
  }
}

export class UpdateURL {
  static changeURL(event?: Event): void {
    const URL: string[] = [];
    const sortURL: string | undefined = this.getURLWithSort();
    const filtersURL: string | undefined = this.getURLWithFilters(
      CreateObjWithFilters.filtersObj
    );
    const inputURL: string | undefined = this.getURLWithInput();
    const priceNStockURL: string | undefined = this.getURLWithPriceNStock();
    const viewURL: string | undefined = this.getURLWithView(event);

    if (filtersURL) URL.push(filtersURL);
    if (sortURL) URL.push(sortURL);
    if (inputURL) URL.push(inputURL);
    if (priceNStockURL) URL.push(priceNStockURL);
    if (viewURL) URL.push(viewURL);

    if (history.pushState) {
      history.pushState("", `${URL}`, `#main-page/${URL.join("|")}`);
    } else {
      console.warn("History API не поддерживается");
    }
  }

  static getURLWithSort(): string | undefined {
    const URL: string[] = [];
    const sort = sortSelect.getElementsByTagName("*");
    for (const child of sort) {
      if (child instanceof HTMLOptionElement) {
        if (child.selected && child.innerHTML === "SORT BY") {
          URL.length = 0;
        } else if (child.selected) {
          URL.push(`sort=${child.innerHTML.replace(/ /g, "_")}`);
        }
      }
    }
    return URL.join("");
  }

  static getURLWithFilters(filtersObj?: IFilters): string | undefined {
    const URL: string[] = [];
    const device: string | undefined = `device=${filtersObj?.device
      .map((item) => item.replace(/ /g, "_"))
      .join("&")}`;
    const material: string | undefined = `material=${filtersObj?.material
      .map((item) => item.replace(/ /g, "_"))
      .join("&")}`;
    const color: string | undefined = `color=${filtersObj?.color
      .map((item) => item.replace(/ /g, "_"))
      .join("&")}`;

    if (filtersObj && filtersObj.device.length > 0 && !URL.includes(device)) {
      URL.push(device);
    }
    if (
      filtersObj &&
      filtersObj.material.length > 0 &&
      !URL.includes(material)
    ) {
      URL.push(material);
    }
    if (filtersObj && filtersObj.color.length > 0 && !URL.includes(color)) {
      URL.push(color);
    }
    return URL.join("|");
  }

  static getURLWithInput(): string | undefined {
    const URL: string[] = [];
    if (searchInput.value) URL.push(`input=${searchInput.value}`);

    return URL.join("");
  }

  static getURLWithPriceNStock(): string | undefined {
    const URL: string[] = [];
    const minPrice: string | null = localStorage.getItem("sliderMinPrice");
    const maxPrice: string | null = localStorage.getItem("sliderMaxPrice");
    const minStock: string | null = localStorage.getItem("sliderMinStock");
    const maxStock: string | null = localStorage.getItem("sliderMaxStock");

    if (Number(minPrice) > 5 || Number(maxPrice) < 100) {
      URL.push(`price=${minPrice}↕${maxPrice}`);
    }
    if (Number(minStock) > 1 || Number(maxStock) < 100) {
      URL.push(`stock=${minStock}↕${maxStock}`);
    }

    return URL.join("|");
  }

  static getURLWithView(event: Event | undefined): string | undefined {
    let URL= "";
    const target = event?.target;
    if (target instanceof HTMLButtonElement) {
      if (target.className.includes("button-view")) {
        if (cardsArea.style.gridTemplateColumns === "auto auto") {
          URL = "view=row";
        } else {
          URL = "view=column";
        }
      }
    }

    if(window.location.hash.includes('view')){
      if (cardsArea.style.gridTemplateColumns === "auto auto") {
        URL = "view=row";
      } else {
        URL = "view=column";
      }
    }

    return URL;
  }
}

export function copyText(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
}
