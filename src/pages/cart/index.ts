import Page from '../../components/templates/page';
import { createArrowButtons } from '../../components/buttons/index';
import { CartProducts } from '../../components/cartProducts/index';
import { products } from '../../data/data';
import { creatSummaryBlock } from '../../components/summary/index';
import { productsInCart } from '../../index';
import { priceProductsInCart } from '../../index';
import { Product } from '../../types/interfaces';

class CartPage extends Page {
  constructor(id: string) {
    super(id);
  }

  private createContent() {
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
    itemsCount.textContent = 'items: 0';

    const paginationBlock: HTMLDivElement = document.createElement('div');
    paginationBlock.classList.add('pagination-block');

    const paginationTitle: HTMLElement = document.createElement('p');
    paginationTitle.textContent = 'pages:';

    const btnArrowleft = createArrowButtons('button-arrow_left');
    const btnArrowRight = createArrowButtons('button-arrow_right');

    const pageNumber: HTMLDivElement = document.createElement('div');
    pageNumber.classList.add('pagination-block__page-namber');
    pageNumber.textContent = `${1}`;

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

    const productCartBlock: HTMLDivElement = document.createElement('div');
    productCartBlock.classList.add('main-block__product-card-block');
    createCartProduct(productCartBlock, itemsCount);

    mainBlock.append(titleBlock, productCartBlock);

    const summatyBlock: HTMLDivElement = document.createElement('div');
    summatyBlock.classList.add('cart__summaty-block');

    summatyBlock.append(
      creatSummaryBlock(countProductInCart(),countSumProductInCart())
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

function createCartProduct(container: HTMLElement, itemsCount: HTMLElement) {
  if (productsInCart.length > 0) {
    productsInCart.forEach((prod, item) => {
      const product: CartProducts = new CartProducts(prod, item + 1);
      container.append(product.render());
      itemsCount.textContent = `items: ${countItemsInCart()}`;
      console.log('корзина перерисована')
      console.log(countItemsInCart())
    })
    return container;
  }
  container.innerHTML = '';
  itemsCount.textContent = `items: 0`;
}

function countSumProductInCart() {
  const productPrices: number[] = [];
  productsInCart.forEach((product) => {
    productPrices.push(product.priceForCart);
  })
  console.log(productPrices)
  return countTotalSum(productPrices);
}

function countItemsInCart() {
  const productPrices: number[] = [];
  productsInCart.forEach((product) => {
    productPrices.push(product.priceForCart);
  })
  return productPrices.length;
}

function countProductInCart() {
  const productCount: number[] = [];
  productsInCart.forEach((product) => {
    productCount.push(product.initialQuality);
  })
  return countTotalSum(productCount);
}

function countTotalSum(pricesCollection: number[]) {
  if (pricesCollection.length > 0) {
    const count: number = pricesCollection.reduce((acc, item) => acc + item);
    return count;
  }
  return 0;
}

export function showCountProductInCartIco() {
  const countContainer = document.querySelector<HTMLElement>('.header__wrapper__cart_circle-with-number');
  const countItem = document.querySelector('.circle-with-number__count') as HTMLElement;
  const count = countProductInCart();
  countItem.textContent = `${count}`;
  if (count > 0) {
    countContainer?.classList.add('circle-with-number_colored');
  } else {
    countContainer?.classList.remove('circle-with-number_colored');
  }
}

function showTotalSumInHeader() {
  const totalProductSum = document.querySelector('.header__wrapper__total-amount_number') as HTMLElement;
  totalProductSum.textContent = `${countSumProductInCart()}`;
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

function changeTotalInSummaryAndHeader() {
  const summaryCount = document.querySelector('.product-count_num') as HTMLElement;
  const summaryTotal = document.querySelector('.total_sum') as HTMLElement;

  summaryCount.textContent = `${countProductInCart()}`;
  summaryTotal.textContent = `${countSumProductInCart()}`;
  showTotalSumInHeader();
  showCountProductInCartIco();
}

export function addProductInCartClickByNow(dataSetId: string | undefined) {
  const itemId = Number(dataSetId);
  const result = productsInCart.findIndex((product) => product.id === itemId )

  if (result === -1) {
    productsInCart.push(products[itemId - 1]);
    priceProductsInCart.push(products[itemId - 1].price);
    showTotalSumInHeader();
  }
}

function changeCountsProductsInCard(dataSetId: string, countData: number, stockData: number, priceData: number) {
  const inputNumber = document.getElementById(`input-id-${dataSetId}`) as HTMLElement;
  const stock = document.getElementById(`stock-id-${dataSetId}`) as HTMLElement;
  const price = document.getElementById(`price-id-${dataSetId}`) as HTMLElement;

  inputNumber.textContent = `${countData}`;
  stock.textContent = `${stockData}`;
  price.textContent = `${priceData}`;
}

function increaseCountProductInCart(item: HTMLElement) {
  if ((item as HTMLElement).closest('.btn-count_plus')) {
    const dataSetId = (item as HTMLElement).dataset.idbtn;
    const cartProductNum = document.getElementById(`product-num-id-${dataSetId}`) as HTMLElement;
    const id = Number(cartProductNum.textContent) - 1;

    if(productsInCart[id].stockForCart > 0) {
      productsInCart[id].initialQuality += 1;
      productsInCart[id].stockForCart -= 1;
      productsInCart[id].priceForCart = productsInCart[id].priceForCart + productsInCart[id].price;

      changeTotalInSummaryAndHeader()
      changeCountsProductsInCard((dataSetId as string), 
        productsInCart[id].initialQuality, 
        productsInCart[id].stockForCart,
        productsInCart[id].priceForCart
      )
    }
    else if (productsInCart[id].stockForCart === 0) {
      changeCountsProductsInCard((dataSetId as string), 
        productsInCart[id].initialQuality, 
        productsInCart[id].stockForCart,
        productsInCart[id].priceForCart
      )
    }
    
  }
}

function decreaseCountProductInCart (item: HTMLElement) {
  if ((item as HTMLElement).closest('.btn-count_minus')) {
    const dataSetId = (item as HTMLElement).dataset.idbtn;
    const cartProductNum = document.getElementById(`product-num-id-${dataSetId}`) as HTMLElement;
    const id = Number(cartProductNum.textContent) - 1;

    if (productsInCart[id].initialQuality > 1) {
      productsInCart[id].initialQuality -= 1;
      productsInCart[id].stockForCart += 1;
      productsInCart[id].priceForCart = productsInCart[id].priceForCart - productsInCart[id].price;

      changeTotalInSummaryAndHeader()
      changeCountsProductsInCard((dataSetId as string), 
        productsInCart[id].initialQuality, 
        productsInCart[id].stockForCart,
        productsInCart[id].priceForCart
      )
    }
    else if (productsInCart[id].initialQuality === 1) {
      const cardBlock = document.querySelector('.main-block__product-card-block') as HTMLElement;
      const itemCount = document.querySelector('.title-block__item-count') as HTMLElement;
      changeCountsProductsInCard((dataSetId as string), 
        productsInCart[id].initialQuality, 
        productsInCart[id].stockForCart,
        productsInCart[id].priceForCart
      )

      removeProductInCart(productsInCart, (dataSetId as string));
      cardBlock.innerHTML = '';
      createCartProduct(cardBlock, itemCount);
      changeTotalInSummaryAndHeader()
    }
  }
}

function removeProductInCart(arr: Product[], value: string) {
  const id = Number(value);
  const index = arr.findIndex((item) => item.id === id)
  return arr.splice(index, 1);
}

const wrapperForPage = (document.querySelector('.main') as HTMLElement);

wrapperForPage.addEventListener('click', function(event) {
  const item = event.target;
  if (!item) return;

  addProductInCartClickBtnAdd(item as HTMLDivElement);
  addProductInCartClickByAddToCard(item as HTMLElement);
  showCountProductInCartIco();
  increaseCountProductInCart(item as HTMLElement);
  decreaseCountProductInCart(item as HTMLElement);
});
