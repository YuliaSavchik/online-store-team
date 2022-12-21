import { createInputs } from "../inputs/index";
import { createMainButtons } from "../buttons/index";

//function as a parameter takes an array with the prices of the product that are in the cart

export function creatSummaryBlock(pricesCollection: number[]) {
  const summaryContainer: HTMLElement = document.createElement('div');
  summaryContainer.classList.add('summary-container');

  const title: HTMLElement = document.createElement('p');
  title.classList.add('summary-container__title');
  title.textContent = 'summary';

  const productCount: HTMLElement = document.createElement('p');
  productCount.classList.add('summary-container__product-count');

  const count = countProducts(pricesCollection);
  const productCountNum: HTMLElement = document.createElement('span');
  productCountNum.classList.add('product-count_num');
  productCountNum.textContent = `${count}`
  productCount.textContent = 'products: ';
  productCount.append(productCountNum);

  const total: HTMLElement = document.createElement('p');
  total.classList.add('summary-container__total');

  const sum = countTotalSum(pricesCollection);
  const totalSum: HTMLElement = document.createElement('span');
  totalSum.classList.add('total_sum');
  totalSum.textContent = `${sum}$`;
  total.innerHTML = 'total: ';
  total.append(totalSum);

  const inputPromoCode = createInputs('text', 'enter promo code');
  inputPromoCode.classList.add('summary-container__input-promo-code');

  const btnBuyNowInCart = createMainButtons('buy now', 'button_large-size', 'cart__btn-buy-now');

  summaryContainer.append(title, productCount, total, inputPromoCode, btnBuyNowInCart);

  return summaryContainer;
}

function countProducts(pricesCollection: number[]) {
  const count: number = pricesCollection.length;

  return count;
}

function countTotalSum(pricesCollection: number[]) {
  const count: number = pricesCollection.reduce((acc: number, price: number) => acc + price);

  return count;
}
