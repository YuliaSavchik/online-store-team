import Page from "../../components/templates/page";
import { infinitySlider } from "../../components/infinitySlider/index";
//import { createCardsArea } from '../../components/productCards/index';
//import Page from "../../components/templates/page";
//import { createCardsArea } from '../../components/productCards/index';
import {
  btnViewThreeColums,
  btnViewTwoColums,
  createMainButtons,
} from "../../components/buttons/index";
//import { createViewPageButtons } from "../../components/buttons/index";
import { createNoUiSliderBlock } from "../../components/noUiSlider/index";
import {
  cardsArea,
  found,
  productsBlock,
  CreateCardsArea,
  searchInput,
  sortSelect,
} from "../../components/productCards/index";
import {
  addFilterBlock,
  copyText,
  CreateObjWithFilters,
  UpdateURL,
} from "../../components/filters/index";

class MainPage extends Page {
  constructor(id: string) {
    super(id);
  }

  static createContent() {
    const mainWrapper: HTMLDivElement = document.createElement("div");
    mainWrapper.classList.add("main__wrapper");

    const sliderBlock: HTMLDivElement = document.createElement("div");
    sliderBlock.classList.add("main__slider");
    const addHeaderSlider: HTMLDivElement = infinitySlider();
    sliderBlock.append(addHeaderSlider);

    const settings: HTMLDivElement = document.createElement("div");
    settings.classList.add("main__settings");

    const btnBlock: HTMLDivElement = document.createElement("div");
    btnBlock.classList.add("settings__btn-block");
    const btnReset = createMainButtons(
      "reset",
      "button_meddium-size",
      "btn-reset"
    );

    btnReset.addEventListener("click", () =>
      CreateCardsArea.reset(CreateObjWithFilters.filtersObj)
    );

    const btnCopyLink = createMainButtons(
      "",
      "button_meddium-size",
      "btn-copy-link"
    );
    btnCopyLink.addEventListener("click", () => {
      copyText(window.location.href);
      localStorage.setItem("link", window.location.hash);
    });

    btnBlock.append(btnReset, btnCopyLink);

    const btnSort = sortSelect;

    const btnViewBlock: HTMLDivElement = document.createElement("div");
    btnViewBlock.classList.add("btn-view-block");

    btnViewBlock.addEventListener("click", (event) => {
      UpdateURL.changeURL(event);
      localStorage.setItem("link", window.location.hash);
    });

    btnViewBlock.append(btnViewThreeColums, btnViewTwoColums);
    btnViewThreeColums.classList.add("checked");

    btnViewThreeColums.addEventListener("click", () => {
      btnViewTwoColums.classList.remove("checked");
      btnViewThreeColums.classList.add("checked");
      cardsArea.style.gridTemplateColumns = "auto auto auto";
      cardsArea.style.gap = "30px";
      cardsArea.style.padding = "30px";
      for (const child of cardsArea.children) {
        if (child instanceof HTMLDivElement) child.style.transform = "scale(1)";
      }
    });

    btnViewTwoColums.addEventListener("click", () => {
      btnViewThreeColums.classList.remove("checked");
      btnViewTwoColums.classList.add("checked");
      cardsArea.style.gridTemplateColumns = "auto auto";
      cardsArea.style.gap = "70px";
      cardsArea.style.padding = "60px";
      for (const child of cardsArea.children) {
        if (child instanceof HTMLDivElement)
          child.style.transform = "scale(1.2)";
      }
    });

    settings.append(btnBlock, btnSort, found, searchInput, btnViewBlock);

    const mainContent: HTMLDivElement = document.createElement("div");
    mainContent.classList.add("main__content");
    const filtersBlock: HTMLDivElement = document.createElement("div");
    filtersBlock.classList.add("filters-block");

    const rangePrice = createNoUiSliderBlock("price");
    rangePrice.classList.add("range-slider_border");
    const rangeStock = createNoUiSliderBlock("stock");
    filtersBlock.append(addFilterBlock, rangePrice, rangeStock);

    mainContent.append(filtersBlock, productsBlock);
    mainWrapper.append(sliderBlock, settings, mainContent);
    return mainWrapper;
  }

  render() {
    this.container.append(content);
    return this.container;
  }
}

const content = MainPage.createContent();

export default MainPage;

window.addEventListener("resize", () => {
  UpdateURL.changeURL();
  if (window.innerWidth < 1000) {
    cardsArea.style.gap = "30px";
    cardsArea.style.padding = "30px";
    for (const child of cardsArea.children) {
      if (child instanceof HTMLDivElement) child.style.transform = "scale(1)";
    }
  }
  if (
    window.innerWidth > 1000 &&
    btnViewTwoColums.classList.contains("checked")
  ) {
    cardsArea.style.gap = "70px";
    cardsArea.style.padding = "60px";
    for (const child of cardsArea.children) {
      if (child instanceof HTMLDivElement) child.style.transform = "scale(1.2)";
    }
  }
});
