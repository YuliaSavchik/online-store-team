import Page from '../../components/templates/page';
import { createArrowButtons } from '../../components/buttons/index';
import { CartProducts } from '../../components/cartProducts/index';
import { products } from '../../data/data';
import { creatSummaryBlock } from '../../components/summary/index';
import { productsInCart } from '../../index';
class CartPage extends Page {
  constructor(id: string) {
    super(id);
  }

  private createContent() {
    const pricesArr: number[] = [];

    const cartWrapper: HTMLDivElement = document.createElement('div');
    cartWrapper.classList.add('cart__wrapper');

    const mainBlock: HTMLDivElement = document.createElement('div');
    mainBlock.classList.add('cart__main-block');

    const titleBlock: HTMLDivElement = document.createElement('div');
    titleBlock.classList.add('main-block__title-block');

    const title: HTMLElement = document.createElement('p');
    title.textContent = 'products in cart';

    const itemsCount: HTMLDivElement = document.createElement('div');
    itemsCount.classList.add('title-block__item-count');

    const paginationBlock: HTMLDivElement = document.createElement('div');
    paginationBlock.classList.add('pagination-block');

    const paginationTitle: HTMLElement = document.createElement('p');
    paginationTitle.textContent = 'pages:';

    const btnArrowleft = createArrowButtons('button-arrow_left');
    const btnArrowRight = createArrowButtons('button-arrow_right');

    const pageNumber: HTMLDivElement = document.createElement('div');
    pageNumber.classList.add('pagination-block__page-namber');
    pageNumber.textContent = `${pricesArr.length}`;

    paginationBlock.append(
      paginationTitle,
      btnArrowleft,
      pageNumber,
      btnArrowRight
    );

    titleBlock.append(
      title,
      itemsCount, 
      paginationBlock
    );

    mainBlock.append(titleBlock);

    productsInCart.forEach((prod, item) => {
      const product: CartProducts = new CartProducts(prod, item + 1);
      pricesArr.push(prod.price);
      mainBlock.append(product.render());
    })
    itemsCount.textContent = `items: ${pricesArr.length}`;

    const summatyBlock: HTMLDivElement = document.createElement('div');
    summatyBlock.classList.add('cart__summaty-block');
    summatyBlock.append(
      creatSummaryBlock(pricesArr)
    );
    
    cartWrapper.append(mainBlock, summatyBlock);

    return cartWrapper; 
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default CartPage;

export function showCountProductInCart() {
  const countItem = document.querySelector('.circle-with-number__count') as HTMLElement;
  countItem.textContent = `${productsInCart.length}`;
}

function addProductInCartClickBtnAdd(item: HTMLElement) {
  if ((item as HTMLDivElement).closest('.btn-add')) {
    const dataSetId = (item as HTMLDivElement).dataset.idcard;
    const index = Number(dataSetId) - 1;
    productsInCart.push(products[index]);
  }
}
const wrapperForPage = (document.querySelector('.main') as HTMLElement);

wrapperForPage.addEventListener('click', function(event) {
  const item = event.target;
  if (!item) return;
  addProductInCartClickBtnAdd(item as HTMLDivElement);
  showCountProductInCart();
});

export function addProductInCartFromDescriprion(dataSetId: string | undefined) {
  const itemId = Number(dataSetId);
    const result = productsInCart.findIndex((product) => product.id === itemId )
    if (result === -1) {
      productsInCart.push(products[itemId - 1])
    }

    console.log(productsInCart);
}
