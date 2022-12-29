import Page from '../../components/templates/page';
import { createArrowButtons } from '../../components/buttons/index';
import { CartProducts } from '../../components/cartProducts/index';
import { products } from '../../data/data';
import { creatSummaryBlock } from '../../components/summary/index';
import { productsInCart } from '../../index';

import { countTotalSum } from '../../components/summary/index';
import { priceProductsInCart } from '../../index';
//import { Product } from '../../types/interfaces';

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
    console.log(pricesArr)

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
  const countContainer = document.querySelector<HTMLElement>('.header__wrapper__cart_circle-with-number');
  const countItem = document.querySelector('.circle-with-number__count') as HTMLElement;
  countItem.textContent = `${priceProductsInCart.length}`;
  if (priceProductsInCart.length > 0) {
    countContainer?.classList.add('circle-with-number_colored');
  } else {
    countContainer?.classList.remove('circle-with-number_colored');
  }
}

function showTotalSumInHeader() {
  const totalProductSum = document.querySelector('.header__wrapper__total-amount_number') as HTMLElement;
  totalProductSum.textContent = `${countTotalSum(priceProductsInCart)}`;
}

function addProductInCart(item: HTMLElement, className: string) {
  if ((item as HTMLElement).closest(className)) {
    const dataSetId = Number((item as HTMLElement).dataset.idbtn);
    const index = dataSetId - 1;
    const result = productsInCart.findIndex((product) => product.id === dataSetId);

    if (result === -1) {
      productsInCart.push(products[index]);
      priceProductsInCart.push(products[index].price);
      showTotalSumInHeader();
    }
  }
}
function addProductInCartClickBtnAdd(item: HTMLElement) {
  addProductInCart(item, '.btn-add');
}

function addProductInCartClickByAddToCard(item: HTMLElement) {
  addProductInCart(item, '.btn-add-card');
}

const wrapperForPage = (document.querySelector('.main') as HTMLElement);

wrapperForPage.addEventListener('click', function(event) {
  const item = event.target;
  if (!item) return;

  addProductInCartClickByAddToCard(item as HTMLElement);
  addProductInCartClickBtnAdd(item as HTMLDivElement);
  showCountProductInCart();
  increaseCountProductInCart(item as HTMLElement);
  decreaseCountProductInCart(item as HTMLElement);
});

export function addProductInCartClickByNow(dataSetId: string | undefined) {
  const itemId = Number(dataSetId);
  const result = productsInCart.findIndex((product) => product.id === itemId )

  if (result === -1) {
    productsInCart.push(products[itemId - 1]);
    priceProductsInCart.push(products[itemId - 1].price);
    showTotalSumInHeader();
  }
}

function increaseCountProductInCart(item: HTMLElement) {
  if ((item as HTMLElement).closest('.btn-count_plus')) {
    const dataSetId = (item as HTMLElement).dataset.idbtn;
    const cartProductNum = document.getElementById(`product-num-id-${dataSetId}`) as HTMLElement;
    const id = Number(cartProductNum.textContent) - 1;
    const inputNumber = document.getElementById(`input-id-${dataSetId}`) as HTMLElement;
    const stock = document.getElementById(`stock-id-${dataSetId}`) as HTMLElement;
    const price = document.getElementById(`price-id-${dataSetId}`) as HTMLElement;
    const summaryCount = document.querySelector('.product-count_num') as HTMLElement;
    const summaryTotal = document.querySelector('.total_sum') as HTMLElement;

    if(productsInCart[id].stockForCart > 0) {
      productsInCart[id].initialQuality += 1;
      productsInCart[id].stockForCart -= 1;
      productsInCart[id].priceForCart = productsInCart[id].priceForCart + productsInCart[id].price;
      priceProductsInCart.push(productsInCart[id].price);
      summaryCount.textContent = `${priceProductsInCart.length}`;
      summaryTotal.textContent = `${countTotalSum(priceProductsInCart)}`;
      showTotalSumInHeader();
      showCountProductInCart();

      inputNumber.textContent = `${productsInCart[id].initialQuality}`;
      stock.textContent = `${productsInCart[id].stockForCart}`;
      price.textContent = `${productsInCart[id].priceForCart}`;
    }
    else if (productsInCart[id].stockForCart === 0) {
      inputNumber.textContent = `${productsInCart[id].initialQuality}`;
      stock.textContent = `${productsInCart[id].stockForCart}`;
      price.textContent = `${productsInCart[id].priceForCart}`;
    }
    
  }
}

function decreaseCountProductInCart (item: HTMLElement) {
  if ((item as HTMLElement).closest('.btn-count_minus')) {
    const dataSetId = (item as HTMLElement).dataset.idbtn;
    const cartProductNum = document.getElementById(`product-num-id-${dataSetId}`) as HTMLElement;
    const id = Number(cartProductNum.textContent) - 1;
    const inputNumber = document.getElementById(`input-id-${dataSetId}`) as HTMLElement;
    const stock = document.getElementById(`stock-id-${dataSetId}`) as HTMLElement;
    const price = document.getElementById(`price-id-${dataSetId}`) as HTMLElement;
    const summaryCount = document.querySelector('.product-count_num') as HTMLElement;
    const summaryTotal = document.querySelector('.total_sum') as HTMLElement;

    if (productsInCart[id].initialQuality > 1) {
      productsInCart[id].initialQuality -= 1;
      productsInCart[id].stockForCart += 1;
      productsInCart[id].priceForCart = productsInCart[id].priceForCart - productsInCart[id].price;
      removePriceProductInTotalCount(priceProductsInCart, productsInCart[id].price);
      summaryCount.textContent = `${priceProductsInCart.length}`;
      summaryTotal.textContent = `${countTotalSum(priceProductsInCart)}`;
      showTotalSumInHeader();
      showCountProductInCart();

      inputNumber.textContent = `${productsInCart[id].initialQuality}`;
      stock.textContent = `${productsInCart[id].stockForCart}`;
      price.textContent = `${productsInCart[id].priceForCart}`;
    }
    else if (productsInCart[id].initialQuality === 1) {
      inputNumber.textContent = `${productsInCart[id].initialQuality}`;
      stock.textContent = `${productsInCart[id].stockForCart}`;
      price.textContent = `${productsInCart[id].priceForCart}`;
    }
  }
}

function removePriceProductInTotalCount(arr: number[], value: number) {
  const index = arr.findIndex((item) => item === value)
  return arr.splice(index, 1);
}

