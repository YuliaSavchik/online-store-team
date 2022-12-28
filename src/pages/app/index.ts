import Page from '../../components/templates/page';
import MainPage from '../main/index';
import ProductDescriptionPage from '../productDescription/index';
import CartPage from '../cart/index';
import ErrorPage from '../error/index';
import { PagesId } from '../../types/enums';
import { showCountProductInCart } from '../cart/index';
import { addProductInCartFromDescriprion } from '../cart/index';

export const wrapperForPage = (document.querySelector('.main') as HTMLElement);

class App {
  private static container: HTMLElement = wrapperForPage;
  private mainPage: MainPage;

  static renderNewPage(idPage: string, idCard?: string) {
    App.container.innerHTML = '';
    let page: Page | null = null;

    if(idPage === PagesId.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PagesId.ProductDescriptionPage) {
      page = new ProductDescriptionPage(idPage, idCard as string);
    } else if (idPage === PagesId.CartPage) {
      page = new CartPage(idPage, idCard as string);
    } else if (idPage === PagesId.ErrorPage) {
      page = new ErrorPage(idPage);
    }

    if(page) {
      const pageHTML = page.render();
      pageHTML.classList.add(`${idPage}`);
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    })
  }

  constructor() {
    this.mainPage = new MainPage('main-page');
  }

  renderPage() {
    App.renderNewPage('main-page');
    this.enableRouteChange();
  }
}

export default App;

function updateURL(pageId: string) {
  if (history.pushState) {
      const baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      const newUrl = baseUrl + `#${pageId}`;
      history.pushState(null, `${pageId}`, newUrl);
  }
  else {
      console.warn('History API не поддерживается');
  }
}
wrapperForPage.addEventListener('click', function(event) {
  
  const item = event.target;

  if (!item) return;

  if ((item as HTMLDivElement).closest('.product-card_shadow')) {
    const dataSetId = (item as HTMLDivElement).dataset.idcard;
    App.renderNewPage('product-description-page', `${dataSetId}`);
    updateURL('product-description-page');
  }

  if ((item as HTMLDivElement).closest('.btn-more')) {
    const dataSetId = (item as HTMLDivElement).dataset.idcard;
    App.renderNewPage('product-description-page', `${dataSetId}`);
    updateURL('product-description-page');
  }

  if ((item as HTMLDivElement).closest('.product-description__btn-buy-now')) {
    const dataSetId = (item as HTMLDivElement).dataset.idbtn;
    addProductInCartFromDescriprion(dataSetId);
    showCountProductInCart();

    App.renderNewPage('cart-page', `${dataSetId}`);
    updateURL('cart-page');
  }
});
