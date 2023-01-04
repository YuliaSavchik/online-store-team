import Page from '../../components/templates/page';
import { createArrowButtons } from '../../components/buttons/index';
import { CartProducts } from '../../components/cartProducts/index';
import { products } from '../../data/data';
import { creatSummaryBlock } from '../../components/summary/index';
import { productsInCart } from '../../index';
import { Product } from '../../types/interfaces';
import { createModalWindow } from '../../components/modalWindow/index';

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

function countSumProductInCart() {
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

      console.log(Math.ceil(productsInCart.length / 3))
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
        }
      } else {
        cardBlock.innerHTML = '';
        createCartProduct(cardBlock, itemCount, numPage);
        changeTotalInSummaryAndHeader();
      }
    }
  }
}

function removeProductInCart(arr: Product[], value: string) {
  const id = Number(value);
  const index = arr.findIndex((item) => item.id === id)
  return arr.splice(index, 1);
}

function createDescriptionPromoCode(promoId: string, namePromo: string, btnName: string, contaiter: HTMLElement) {
  const promoCodeName: HTMLElement = document.createElement('div');
  promoCodeName.classList.add('promo-code-name');
  promoCodeName.textContent = `${namePromo} - 10%`;
  const promoCodeBtn: HTMLButtonElement = document.createElement('button');
  promoCodeBtn.classList.add('promo-code-btn');
  promoCodeBtn.classList.add(`promo-code-btn_${btnName}`);
  promoCodeBtn.setAttribute(`data-id${btnName}`, `id-${promoId}`);
  promoCodeBtn.textContent = `${btnName}`;
  contaiter.append(promoCodeName, promoCodeBtn);
  contaiter.classList.remove('promo-code-none');

  return contaiter;
}

export function showAvailablePromoCode() {
  const input = document.querySelector<HTMLInputElement>('.summary-container__input-promo-code');
  if(!input) return;
  const containerForPromo = document.querySelector<HTMLElement>('.promo-code__block-add');
  if(!containerForPromo) return;

  input.addEventListener('input', () => {
    if (input.value === 'RS') {
      createDescriptionPromoCode(input.value, 'RSSchool', 'add', containerForPromo);
    }
    else if (input.value === 'EPM') {
      createDescriptionPromoCode(input.value, 'EPAM System', 'add', containerForPromo);
    }
    else {
      containerForPromo.textContent = '';
    }
  });
}

function addPromoCode(item: HTMLElement) {
  const summary = document.querySelector<HTMLElement>('.summary-container');
  if (!summary) return;
  const containerForAdd = document.querySelector<HTMLElement>('.applied-promo-code-block');
  if (!containerForAdd) return;
  const conteinerAppliedRS = document.querySelector<HTMLElement>('.applied-promo-code-rs');
  if(!conteinerAppliedRS) return;
  const conteinerAppliedEPM = document.querySelector<HTMLElement>('.applied-promo-code-epm');
  if(!conteinerAppliedEPM) return;
  const containerForPromo = document.querySelector<HTMLElement>('.promo-code__block-add');
  if(!containerForPromo) return;
  const summaryTotalSum = document.querySelector<HTMLElement>('.total_sum');
  if (!summaryTotalSum) return;

  if ((item as HTMLElement).closest('.promo-code-btn_add')) {
    if (item.dataset.idadd === 'id-RS') {
      conteinerAppliedRS.setAttribute('id', 'id-RS');
      containerForAdd.append(createDescriptionPromoCode('RS', 'RSSchool', 'drop', conteinerAppliedRS));
      containerForAdd.classList.remove('promo-code-none');
      containerForPromo.textContent = '';
      summary.classList.add('add-promo-block');
      if (summaryTotalSum.closest('.total-with-promo')) {
        addSecondPromoCodeToPrice();
      } else {
        addFirstPromoCodeToPrice();
      }
     
    }
    else if (item.dataset.idadd === 'id-EPM') {
      conteinerAppliedEPM.setAttribute('id', 'id-EPM')
      containerForAdd.append(createDescriptionPromoCode('EPM', 'EPAM System', 'drop', conteinerAppliedEPM));
      containerForAdd.classList.remove('promo-code-none');
      containerForPromo.textContent = '';
      summary.classList.add('add-promo-block');
      if (summaryTotalSum.closest('.total-with-promo')) {
        addSecondPromoCodeToPrice();
      } else {
        addFirstPromoCodeToPrice();
      }
    }
  }
}

function addFirstPromoCodeToPrice() {
  const summaryTotalSum = document.querySelector<HTMLElement>('.total_sum');
  if (!summaryTotalSum) return;
  const summaryTotalSumWithPromo = document.querySelector<HTMLElement>('.total_sum-with-promo');
  if (!summaryTotalSumWithPromo) return;
  const total = Number(summaryTotalSum.textContent);
  summaryTotalSum.classList.add('total-with-promo');
  summaryTotalSumWithPromo.textContent = `${countSumWithPromo(total)}`;
}

function addSecondPromoCodeToPrice() {
  const summaryTotalSumWithPromo = document.querySelector<HTMLElement>('.total_sum-with-promo');
  if (!summaryTotalSumWithPromo) return;
  const totalWithPromo = Number(summaryTotalSumWithPromo.textContent);
  summaryTotalSumWithPromo.textContent = `${countSumWithPromo(totalWithPromo)}`;
}

function removePromoCode(item: HTMLElement) {
  const summary = document.querySelector<HTMLElement>('.summary-container');
  if (!summary) return;
  const containerForAdd = document.querySelector<HTMLElement>('.applied-promo-code-block');
  if (!containerForAdd) return;
  const summaryTotalSum = document.querySelector<HTMLElement>('.total_sum');
  if (!summaryTotalSum) return;
  const totalSum = Number(summaryTotalSum.textContent);
  const summaryTotalSumWithPromo = document.querySelector<HTMLElement>('.total_sum-with-promo');
  if (!summaryTotalSumWithPromo) return;

  if ((item as HTMLElement).closest('.promo-code-btn_drop')) {
    const dataSetId = item.dataset.iddrop;
    const delPromoBlock = document.getElementById(dataSetId as string) as HTMLElement;
    if (summaryTotalSumWithPromo.textContent !== '') {
      const total = Number(summaryTotalSumWithPromo.textContent);
      summaryTotalSumWithPromo.textContent = `${countSumDelitePromo(total)}`;
      delPromoBlock.innerHTML = '';
      const sumWithPromo = countSumDelitePromo(total)
      if ( totalSum === sumWithPromo) {
        summaryTotalSumWithPromo.textContent = '';
        containerForAdd.classList.add('promo-code-none');
        summaryTotalSum.classList.remove('total-with-promo');
        summary.classList.remove('add-promo-block');
      }
    }

  }
}

function countSumWithPromo(sum: number) {
  const percent = (sum / 100) * 10;
  const result = Math.round(sum - percent);
  return result;
}

function countSumDelitePromo(sum: number) {
  const percent = (sum / 100) * 10;
  const result = Math.round(sum + percent);
  return result;
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
  addPromoCode(item as HTMLDivElement);
  removePromoCode(item as HTMLDivElement);
  openModalWindowInCart(item as HTMLElement);
});


