import Page from '../../components/templates/page';
import { createArrowButtons } from '../../components/buttons/index';
import { CartProducts } from '../../components/cartProducts/index';
import { products } from '../../data/data';
import { creatSummaryBlock } from '../../components/summary/index';
import { productsInCart, activPromoCode } from '../../index';
import { Product } from '../../types/interfaces';
import { createModalWindow } from '../../components/modalWindow/index';
import { showAvailablePromoCode } from '../../components/summary/index';
import { 
  addDiscount, 
  changeBlockTotalWitnPromo, 
  decreaseDiscountWhenDecreaseProduct,
  createPromoBlockIfCodeAdding
} from '../../components/summary/index';

let numPage = 1;
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
    btnArrowleft.classList.add('arrow-prev-page')
    const btnArrowRight = createArrowButtons('button-arrow_right');
    btnArrowRight.classList.add('arrow-next-page')

    const pageNumber: HTMLDivElement = document.createElement('div');
    pageNumber.classList.add('pagination-block__page-namber');
    pageNumber.textContent = `${numPage}`;

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
    createCartProduct(productCartBlock, itemsCount, numPage);

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
    this.container.append(content);
    showAvailablePromoCode();
    createPromoBlockIfCodeAdding();
    return this.container;
  }
}

export default CartPage;

function splitItemsForPages(array: Product[]) {
  const arrayWithProduct: Product[] = [];
  array.forEach((item) => {
    arrayWithProduct.push(item);
  })
  const result: Product[][] = [];
  const length = 3;
  while(arrayWithProduct.length) {
    result.push(arrayWithProduct.splice(0,length)); 
  }
  return result;
}

function createCartProduct(container: HTMLElement, itemsCount: HTMLElement, numPage: number) {
  if (productsInCart.length > 0) {
    const itemsOnPage = splitItemsForPages(productsInCart);
    productsInCart.forEach((item, index) => {
      itemsOnPage[numPage - 1].forEach((prod) => {
        if (item.id === prod.id) {
          const product: CartProducts = new CartProducts(prod, index + 1);
          container.append(product.render());
          itemsCount.textContent = `items: ${countItemsInCart()}`;
        }
      })
    })
    return container;
  }
  emptyCart();
}

export function emptyCart() {
  const cartBlock = document.querySelector<HTMLElement>('.cart__main-block');
  const summary = document.querySelector<HTMLElement>('.cart__summaty-block');
  if (!cartBlock) return;
  cartBlock.innerHTML = '';
  const text: HTMLDivElement = document.createElement('div');
  text.classList.add('empty-text');
  text.textContent = 'Cart is Empty';
  cartBlock.append(text);
  if(!summary) return;
  summary.style.display = 'none';
  activPromoCode.length = 0;
}

function switchPages(item: HTMLElement) {
  const container = document.querySelector<HTMLElement>('.main-block__product-card-block');
  if(!container) return;
  const itemCount = document.querySelector<HTMLElement>('.title-block__item-count');
  if(!itemCount) return;
  const paginationCount = document.querySelector('.pagination-block__page-namber') as HTMLElement;

  if((item as HTMLElement).closest('.arrow-next-page')) {
    const maxPage = Math.ceil(productsInCart.length / 3);
    if (numPage < maxPage) {
      numPage += 1;
      container.textContent = '';
      createCartProduct(container, itemCount, numPage);
      paginationCount.textContent = `${numPage}`;
    } 
    else if (numPage === maxPage) return;
  }
  if((item as HTMLElement).closest('.arrow-prev-page')) {
    if (numPage > 1) {
      numPage -= 1;
      container.textContent = '';
      createCartProduct(container, itemCount, numPage);
      paginationCount.textContent = `${numPage}`;
    } else if (numPage === 1) return;
  }

}

export function countSumProductInCart() {
  const productPrices: number[] = [];
  productsInCart.forEach((product) => {
    productPrices.push(product.priceForCart);
  })
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

export function addProductInCartClickByNow(dataSetId: string | undefined, item: HTMLElement) {
  const itemId = Number(dataSetId);
  const result = productsInCart.findIndex((product) => product.id === itemId )

  if (result === -1) {
    productsInCart.push(products[itemId - 1]);
    showTotalSumInHeader();
  }
  openModalWindowInProductCart(item);
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

      changeTotalInSummaryAndHeader();
      changeCountsProductsInCard((dataSetId as string), 
        productsInCart[id].initialQuality, 
        productsInCart[id].stockForCart,
        productsInCart[id].priceForCart
      );
      changeBlockTotalWitnPromo();
      addDiscount();
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

      changeTotalInSummaryAndHeader();
      changeCountsProductsInCard((dataSetId as string), 
        productsInCart[id].initialQuality, 
        productsInCart[id].stockForCart,
        productsInCart[id].priceForCart
      );

      if (activPromoCode.length > 0) {
        decreaseDiscountWhenDecreaseProduct();
      }
    }
    else if (productsInCart[id].initialQuality === 1) {
      const cardBlock = document.querySelector('.main-block__product-card-block') as HTMLElement;
      const itemCount = document.querySelector('.title-block__item-count') as HTMLElement;
      changeCountsProductsInCard((dataSetId as string), 
        productsInCart[id].initialQuality, 
        productsInCart[id].stockForCart,
        productsInCart[id].priceForCart
      );

      removeProductInCart(productsInCart, (dataSetId as string));
      if (Math.ceil(productsInCart.length / 3) < numPage) {
        numPage -= 1;
        cardBlock.innerHTML = '';
        createCartProduct(cardBlock, itemCount, numPage);
        changeTotalInSummaryAndHeader();
        if (productsInCart.length > 0) {
          const paginationCount = document.querySelector<HTMLElement>('.pagination-block__page-namber');
          if (!paginationCount) return;
          paginationCount.textContent = `${numPage}`;
        } else if (productsInCart.length === 0) {
          numPage = 1;
          activPromoCode.length = 0;
        }
      } else {
        cardBlock.innerHTML = '';
        createCartProduct(cardBlock, itemCount, numPage);
        changeTotalInSummaryAndHeader();
      }

      if (activPromoCode.length > 0) {
        decreaseDiscountWhenDecreaseProduct();
      }
    }
  }
}

function removeProductInCart(arr: Product[], value: string) {
  const id = Number(value);
  const index = arr.findIndex((item) => item.id === id)
  return arr.splice(index, 1);
}

function openModalWindowInCart(item: HTMLElement) {
  if ((item as HTMLElement).closest('.cart__btn-buy-now')) {
    createModalWindow();
    clouseModalWindow();
  }
}

function openModalWindowInProductCart(item: HTMLElement) {
  if ((item as HTMLElement).closest('.product-description__btn-buy-now')) {
    createModalWindow();
    clouseModalWindow();
  }
}

function clouseModalWindow() {
  const modal = document.querySelector<HTMLElement>('.modal-window__shadow');
    if (!modal) return; 
    modal.addEventListener('click', (event) => {
      const item = event.target as HTMLElement;
      if (!item) return;

    const classes = item.classList;
      if (classes.contains('modal-window__shadow')) {
        modal.remove();
      }
    })
}

const wrapperForPage = (document.querySelector('.main') as HTMLElement);

wrapperForPage.addEventListener('click', function(event) {
  const item = event.target;
  if (!item) return;

  addProductInCartClickBtnAdd(item as HTMLDivElement);
  addProductInCartClickByAddToCard(item as HTMLElement);
  switchPages(item as HTMLElement);
  showCountProductInCartIco();
  increaseCountProductInCart(item as HTMLElement);
  decreaseCountProductInCart(item as HTMLElement);
  openModalWindowInCart(item as HTMLElement);
});


