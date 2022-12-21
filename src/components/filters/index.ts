import { Color, Device, Material } from "../../types/enums";
import { createArrowButtons } from "../buttons/index";
import "./filters.scss";

const main = document.querySelector(".main");
const btnArrowTop = createArrowButtons('button-arrow_top');

class Filter {
  items: string[];
  title: string;

  constructor(title: string, items: string[]) {
    this.title = title;
    this.items = items;
  }

  filter = document.createElement("div");
  arrow = document.createElement("span");
  filter_header = document.createElement("div");
  checkbox_field = document.createElement("div");
  form = document.createElement("form");

  render() {
    this.filter.classList.add("filter");

    this.filter_header.classList.add("filter-header");

    this.filter_header.innerHTML = `<span>${this.title.toUpperCase()}</span>`;

    this.arrow.appendChild(btnArrowTop.cloneNode(true));
    this.arrow.classList.add("arrow");
    this.filter_header.appendChild(this.arrow);

    this.filter.appendChild(this.filter_header);

    this.checkbox_field.classList.add("checkbox-field");

    this.createElements();

    this.checkbox_field.appendChild(this.form);
    this.filter.appendChild(this.checkbox_field);

    this.arrow.addEventListener("click", () => {
      this.arrow.classList.toggle("rotate");
      this.filter.classList.toggle("collapsible");
    });

    return this.filter;
  }

  createElements() {
    for (let i = 0; i < this.items.length; i++) {
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", `${this.title}-checkbox-${i}`);
      checkbox.classList.add("checkbox");
      this.form.appendChild(checkbox);
      const label = document.createElement("label");
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
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", `${this.title}-checkbox-${i}`);
      checkbox.classList.add("checkbox");

      this.form.appendChild(checkbox);
      const label = document.createElement("label");

      label.setAttribute("for", `${this.title}-checkbox-${i}`);
      label.classList.add("color-label");

      const color_circle = document.createElement("div");

      color_circle.style.backgroundColor =
        this.colorHash.get(this.items[i]) ?? "white";

      color_circle.classList.add("color-circle");

      label.appendChild(color_circle);
      label.appendChild(document.createTextNode(this.items[i]));
      this.form.appendChild(label);
    }
  }
}

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

main?.append(
  deviceFilter.render(),
  materialFilter.render(),
  colorFilter.render()
);
