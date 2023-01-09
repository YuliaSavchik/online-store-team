import Page from "../../components/templates/page";
import MainPage from "../main/index";
import ProductDescriptionPage from "../productDescription/index";
import CartPage from "../cart/index";
import ErrorPage from "../error/index";
import { PagesId } from "../../types/enums";
import { Product } from "../../types/interfaces";
import {
  showCountProductInCartIco,
  showTotalSumInHeader,
  addProductInCartClickByNow,
  emptyCart,
} from "../cart/index";
import {
  showAvailablePromoCode,
  createPromoBlockIfCodeAdding,
} from "../../components/summary/index";
import { createMainButtons } from "../../components/buttons/index";
import { RenderContentByURL, UpdateURL } from "../../components/filters/index";

export const wrapperForPage = document.querySelector(".main") as HTMLElement;
export let productsInCart: Product[] = [];
export const local: Storage = localStorage;
export let activPromoCode: string[] = [];

class App {
  private static container: HTMLElement = wrapperForPage;
  private mainPage: MainPage;

  static renderNewPage(idPage: string, idCard?: string) {
    App.container.innerHTML = "";
    let page: Page | null = null;

    if (idPage.includes(PagesId.MainPage)) {
      page = new MainPage(idPage);
    } else if (idPage.includes(PagesId.ProductDescriptionPage)) {
      const hash = window.location.hash.slice(1);
      console.log(hash)
      page = new ProductDescriptionPage(idPage, idCard as string);
    } else if (idPage === PagesId.CartPage) {
      page = new CartPage(idPage);
    } else {
      page = new ErrorPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.classList.add(`${idPage}`);
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.mainPage = new MainPage("main-page");
  }

  renderPage() {
    const link = localStorage.getItem("link");
    if (link) {
      RenderContentByURL.render(link);
    }
    UpdateURL.changeURL();
    this.enableRouteChange();
    App.renderNewPage("main-page");
  }
}

export default App;

export function updateURL(pageId: string, URL = '') {
  if (history.pushState) {
    if (history.state && history.state.url === `#${pageId}/${URL}`) {
      return;
    } else {
      const baseUrl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      const newUrl = baseUrl + `#${pageId}/${URL}`;
      history.pushState({ url: `#${pageId}/${URL}` }, "", `${newUrl}`);
    }
  } else {
    console.warn("History API не поддерживается");
  }
}

wrapperForPage.addEventListener("click", function (event) {
  const item = event.target;

  if (!item) return;

  if ((item as HTMLDivElement).closest(".product-card_shadow")) {
    const dataSetId = (item as HTMLDivElement).dataset.idcard;
    App.renderNewPage("product-description-page", `${dataSetId}`);
    updateURL("product-description-page");
  }

  if ((item as HTMLDivElement).closest(".btn-more")) {
    const dataSetId = (item as HTMLDivElement).dataset.idcard;
    App.renderNewPage("product-description-page", `${dataSetId}`);
    updateURL("product-description-page");
  }

  if ((item as HTMLDivElement).closest(".product-description__btn-buy-now")) {
    const dataSetId = (item as HTMLDivElement).dataset.idbtn;
    addProductInCartClickByNow(dataSetId, item as HTMLElement);
    showCountProductInCartIco();

    App.renderNewPage("cart-page");
    updateURL("cart-page");

    showAvailablePromoCode();
    createPromoBlockIfCodeAdding();
  }
});

const headerBtnCart = document.querySelector(
  ".header__wrapper__cart"
) as HTMLElement;
headerBtnCart.addEventListener("click", (event) => {
  const item = event.target;
  if (!item) return;

  if ((item as HTMLDivElement).closest(".header__wrapper__cart")) {
    App.renderNewPage("cart-page");
    updateURL("cart-page");
    showAvailablePromoCode();
    createPromoBlockIfCodeAdding();

    if (productsInCart.length === 0) {
      emptyCart();
    }
  }
});

const mainPageLink = document.querySelector(
  ".header__wrapper__link"
) as HTMLElement;
mainPageLink.addEventListener("click", (event) => {
  const item = event.target;
  if (!item) return;

  if ((item as HTMLElement).closest(".header__wrapper__link")) {
    const link = localStorage.getItem("link");
    if (link) {
      App.renderNewPage("main-page");
      updateURL("main-page", link.split("/")[1])
      changeBtnAddOnRemoveAndBack();
    }
  }
});

function changeBtnAddOnRemoveAndBack() {

  const collection = document.querySelectorAll('.btn-box');
    collection.forEach((btnBox) => {
      const id = Number(btnBox.getAttribute('id'));
      const result = productsInCart.findIndex((product) => product.id === id);
      if (result === -1) {
        btnBox.innerHTML = '';
        const btnAdd = createMainButtons('add', 'button_small-size', 'btn-add');
        btnAdd.classList.add('button');
        btnAdd.setAttribute("data-idbtn", `${id}`);
        btnBox.append(btnAdd);
      } else {
        btnBox.innerHTML = '';
        const btnRemove = createMainButtons('remove', 'button_small-size', 'btn-remove');
        btnRemove.classList.add('button');
        btnRemove.setAttribute("data-idbtn", `${id}`);
        btnBox.append(btnRemove);
      }
    })
}

window.addEventListener('DOMContentLoaded', () => {
  if (local.getItem('productInCart')) {
    productsInCart = JSON.parse(local.getItem('productInCart') as string);

    changeBtnAddOnRemoveAndBack();
    showTotalSumInHeader();
    showCountProductInCartIco();
  }

  if (local.getItem("activPromoCode")) {
    activPromoCode = JSON.parse(local.getItem("activPromoCode") as string);
    createPromoBlockIfCodeAdding();
  }
});
