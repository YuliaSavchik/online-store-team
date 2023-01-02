import { products } from "../../data/data";
import { Color, Device, Material } from "../../types/enums";
import { IFilters } from "../../types/interfaces";
import { createArrowButtons } from "../buttons/index";
import { createCardsArea } from "../productCards/index";

const btnArrowTop = createArrowButtons("button-arrow_top");

export const filtersObj: IFilters = {
  device: [],
  material: [],
  color: [],
};

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

export function createFilterBlock() {
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
    fillFiltersObj(event);
  });

  return filterBlock;
}

window.addEventListener("load", fillFiltersObj);

function addFiltersToArr(
  arr: string[],
  str: string,
  target: HTMLInputElement,
  label: string | null | undefined
) {
  if (label && label === str && !arr.includes(label) && target.checked) {
    arr.push(label);
  } else if (label && arr.includes(label) && !target.checked) {
    arr.splice(arr.indexOf(label), 1);
  }
}

export function fillFiltersObj(event: Event) {
  const target: EventTarget | null = event.target;

  if (target && target instanceof HTMLInputElement) {
    const label = document.querySelector(`label[for="${target.id}"]`);
    const labelToString: string | null | undefined =
      label?.lastChild?.textContent;

    for (let i = 0; i < products.length; i++) {
      addFiltersToArr(
        filtersObj.device,
        products[i].device,
        target,
        labelToString
      );
      addFiltersToArr(
        filtersObj.material,
        products[i].material,
        target,
        labelToString
      );
      addFiltersToArr(
        filtersObj.color,
        products[i].color,
        target,
        labelToString
      );
    }
  }
  return createCardsArea(filtersObj);
}
