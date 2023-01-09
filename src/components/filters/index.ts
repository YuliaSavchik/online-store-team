import { products } from "../../data/data";
import { updateURL } from "../../pages/app/index";
import { Color, Device, Material } from "../../types/enums";
import { IFilters } from "../../types/interfaces";
import {
  btnViewThreeColums,
  btnViewTwoColums,
  createArrowButtons,
} from "../buttons/index";
import {
  CreateCardsArea,
  sortSelect,
  searchInput,
  cardsArea,
  changePriceSlider,
  changeStockSlider,
  priceArr,
  stockArr,
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

      const count: HTMLDivElement = document.createElement("div");
      count.classList.add("count");
      count.appendChild(document.createTextNode("1"));
      this.form.appendChild(count);
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

  return filterBlock;
}

export const addFilterBlock: HTMLElement = createFilterBlock();

const filters = addFilterBlock.getElementsByTagName("*");

for (const child of filters) {
  if (child instanceof HTMLFormElement) {
    child.addEventListener("click", (event) => {
      CreateObjWithFilters.fillFiltersObj(event);
      changePriceSlider(5, 100);
      changeStockSlider(1, 100);
      if (priceArr.length > 0)
        changePriceSlider(Math.min(...priceArr), Math.max(...priceArr));
      if (stockArr.length > 0)
        changeStockSlider(Math.min(...stockArr), Math.max(...stockArr));
      UpdateURL.changeURL();
      localStorage.setItem("link", window.location.hash);
    });
  }
}

window.addEventListener("load", (event) => {
  RenderContentByURL.render(window.location.hash, event);
  UpdateURL.changeURL(event);
});

window.addEventListener("hashchange", (event) => {
  RenderContentByURL.render(window.location.hash, event);
  UpdateURL.changeURL(event);
  localStorage.setItem("link", window.location.hash);
});

export class RenderContentByURL {
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
    if (hash.includes("price")) {
      changePriceSlider(
        Number(this.hashTypes.price.split("%E2%86%95")[0]),
        Number(this.hashTypes.price.split("%E2%86%95")[1])
      );
    } else {
      changePriceSlider(5, 100);
    }

    if (hash.includes("stock")) {
      changeStockSlider(
        Number(this.hashTypes.stock.split("%E2%86%95")[0]),
        Number(this.hashTypes.stock.split("%E2%86%95")[1])
      );
    } else {
      changeStockSlider(1, 100);
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
        } else if (
          (labelToString && !hash.includes(labelToString.replace(/ /g, "_"))) ||
          !hash.includes(child.id.split("-")[0])
        ) {
          child.checked = false;
        }
      }
    }

    const URL = hash.includes("|")
      ? hash.split("/")[1].split("|")
      : [hash.split("/")[1]];

    const filters: Record<string, string> = {
      device: "",
      material: "",
      color: "",
    };

    URL.forEach((item) => {
      if (item && item.includes("=")) {
        const [key, value] = item.split("=");
        filters[key] = value;
      }
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

  static render(hash: string, event?: Event): void {
    const URL = hash.split("/")[1];
    const URLSplit: string[] =
      URL && URL.includes("|") ? URL.split("|") : [URL];

    URLSplit.forEach((item) => {
      if (item && item.includes("=")) {
        const [key, value] = item.split("=");
        this.hashTypes[key] = value;
      }
    });

    //check view
    if (this.hashTypes.view.includes("2col") || !hash.includes("view")) {
      if (window.innerWidth > 1020) {
        btnViewThreeColums.classList.remove("checked");
        btnViewTwoColums.classList.add("checked");
        cardsArea.style.gridTemplateColumns = "auto auto";
        cardsArea.style.gap = "70px";
        cardsArea.style.padding = "60px";
      }
    } else {
      if (window.innerWidth > 1020) {
        btnViewTwoColums.classList.remove("checked");
        btnViewThreeColums.classList.add("checked");
        cardsArea.style.gridTemplateColumns = "auto auto auto";
        cardsArea.style.gap = "30px";
        cardsArea.style.padding = "30px";
      }
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
    if (document.querySelector(".range-slider")) {
      this.checkSlider(hash);
    }

    if (event) CreateObjWithFilters.fillFiltersObj(event);
  }
}

export class UpdateURL {
  static URL: string[] = [];
  static changeURL(event?: Event): void {
    this.URL.length = 0;
    const sortURL: string | undefined = this.getURLWithSort();
    const filtersURL: string | undefined = this.getURLWithFilters(
      CreateObjWithFilters.filtersObj
    );
    const inputURL: string | undefined = this.getURLWithInput();
    const priceNStockURL: string | undefined = this.getURLWithPriceNStock();
    const viewURL: string | undefined = this.getURLWithView(event);

    if (filtersURL) this.URL.push(filtersURL);
    if (sortURL) this.URL.push(sortURL);
    if (inputURL) this.URL.push(inputURL);
    if (priceNStockURL) this.URL.push(priceNStockURL);
    if (viewURL) this.URL.push(viewURL);

    if(window.location.href.includes('main-page')){
      updateURL('main-page', this.URL.join("|"))
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
    let URL = "";
    const target = event?.target;
    if (target instanceof HTMLButtonElement) {
      if (target.className.includes("button-view")) {
        if (cardsArea.style.gridTemplateColumns === "auto auto") {
          URL = "view=2col";
        } else {
          URL = "view=3col";
        }
      }
    }

    if (window.location.hash.includes("view")) {
      if (cardsArea.style.gridTemplateColumns === "auto auto") {
        URL = "view=2col";
      } else {
        URL = "view=3col";
      }
    }

    if (window.innerWidth < 1020) {
      URL = "";
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

