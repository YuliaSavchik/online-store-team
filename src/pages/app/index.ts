import Page from '../../components/templates/page';
import MainPage from '../main/index';
import ProductDiscriptionPage from '../productDiscription/index';
import CartPage from '../cart/index';
import ErrorPage from '../error/index';

export const enum PagesId {
  MainPage = 'main-page',
  ProductDiscriptionPage = 'product-discription-page',
  CartPage = 'cart-page',
  ErrorPage = 'error-page'
}

export const wrapperForPage = (document.querySelector('.main__wrapper') as HTMLElement);

class App {
  private static container: HTMLElement = wrapperForPage;
  private mainPage: MainPage;

  static renderNewPage(idPage: string) {
    App.container.innerHTML = '';
    let page: Page | null = null;

    if(idPage === PagesId.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PagesId.ProductDiscriptionPage) {
      page = new ProductDiscriptionPage(idPage);
    } else if (idPage === PagesId.CartPage) {
      page = new CartPage(idPage);
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
    App.renderNewPage('product-discription-page');
    this.enableRouteChange();
  }
}

export default App;
