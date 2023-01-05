import { products } from "../../data/data";
import { Color, Device, Material } from "../../types/enums";
import { IFilters } from "../../types/interfaces";
import { createArrowButtons } from "../buttons/index";
import {
  CreateCardsArea,
  addFilterBlock,
  sortSelect,
  searchInput,
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
      updateURLFilters();
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

  filterBlock.addEventListener("click", (event: Event) => {
    CreateObjWithFilters.fillFiltersObj(event);
  });

  return filterBlock;
}

window.addEventListener("load", (event) => {
  changeFilterObjByURL(window.location.hash, event);
  checkHash(window.location.hash);
});

window.addEventListener("hashchange", (event) => {
  changeFilterObjByURL(window.location.hash, event);
  checkHash(window.location.hash);
});

function checkHash(hash: string): void {
  //check filters
  const filters = addFilterBlock.getElementsByTagName("*");

  for (const child of filters) {
    if (child instanceof HTMLInputElement) {
      const label = document.querySelector(`label[for="${child.id}"]`);
      const labelToString: string | null | undefined =
        label?.lastChild?.textContent;

      if (labelToString && hash.includes(labelToString.replace(/ /g, "_"))) {
        child.checked = true;
      } else if (
        labelToString &&
        !hash.includes(labelToString.replace(/ /g, "_"))
      ) {
        child.checked = false;
      }
    }
  }

  //check sort
  const sort = sortSelect.getElementsByTagName("*");
  for (const child of sort) {
    if (child instanceof HTMLOptionElement) {
      if (hash.includes(child.innerHTML.replace(/ /g, "_"))) {
        child.selected = true;
      }
    }
  }

  //check input
  if(hash.includes('input')){
    searchInput.value = hash.slice(hash.indexOf('input=') + 'input='.length)
  }
}

export function updateURLFilters(): void {
  const URL: string[] = [];
  const sortURL: string | undefined = getURLWithSort();
  const filtersURL: string | undefined = getURLWithFilters(
    CreateObjWithFilters.filtersObj
  );
  const inputURL = getURLWithInput();

  if (filtersURL) URL.push(filtersURL);
  if (sortURL) URL.push(sortURL);
  if (inputURL) URL.push(inputURL);

  if (history.pushState) {
    history.pushState("", `${URL}`, `#main-page/${URL.join("|")}`);
  } else {
    console.warn("History API не поддерживается");
  }
}

export function changeFilterObjByURL(URLStr: string, event: Event): void {
  const URL = URLStr.split("/")[1];
  const URLSplit: string[] = URL.includes("|") ? URL.split("|") : [URL];

  const filters: Record<string, string> = {
    device: "",
    material: "",
    color: "",
  };

  URLSplit.forEach((item) => {
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

  CreateObjWithFilters.fillFiltersObj(event);
}

export function getURLWithSort(): string | undefined {
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

function getURLWithFilters(filtersObj?: IFilters): string | undefined {
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
  if (filtersObj && filtersObj.material.length > 0 && !URL.includes(material)) {
    URL.push(material);
  }
  if (filtersObj && filtersObj.color.length > 0 && !URL.includes(color)) {
    URL.push(color);
  }
  return URL.join("");
}

function getURLWithInput(): string | undefined {
  const URL: string[] = [];
  URL.push(`input=${searchInput.value}`);
  return URL.join("");
}
