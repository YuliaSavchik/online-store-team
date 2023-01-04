import { createInputs } from "../inputs/index";
import { createMainButtons } from "../buttons/index";

export function creatSummaryBlock(count: number, sum: number) {
  const summaryContainer: HTMLElement = document.createElement('div');
  summaryContainer.classList.add('summary-container');

  const title: HTMLElement = document.createElement('p');
  title.classList.add('summary-container__title');
  title.textContent = 'summary';

  const productCount: HTMLElement = document.createElement('p');
  productCount.classList.add('summary-container__product-count');

  const productCountNum: HTMLElement = document.createElement('span');
  productCountNum.classList.add('product-count_num');
  productCountNum.textContent = `${count}`;
  productCount.textContent = 'products: ';
  productCount.append(productCountNum);

  const total: HTMLElement = document.createElement('p');
  total.classList.add('summary-container__total');

  const totalSum: HTMLElement = document.createElement('span');
  totalSum.classList.add('total_sum');
  totalSum.textContent = `${sum}`;
  const totalSumWithPromo: HTMLElement = document.createElement('span');
  totalSumWithPromo.classList.add('total_sum-with-promo');
  total.innerHTML = 'total: ';
  total.append(totalSum, totalSumWithPromo);

  const promoCodeBlock: HTMLElement = document.createElement('div');

  const inputPromoCode = createInputs('text', 'enter promo code');
  inputPromoCode.classList.add('summary-container__input-promo-code');

  const promoCodeText: HTMLElement = document.createElement('p');
  promoCodeText.classList.add('promo-code-text');
  promoCodeText.textContent = 'promo code: RS, EPM';

  const promoCodeAdd: HTMLElement = document.createElement('div');
  promoCodeAdd.classList.add('promo-code__block-add'); 
  const appliedPromoCodeBlock: HTMLElement = document.createElement('div');
  appliedPromoCodeBlock.classList.add('applied-promo-code-block');
  const appliedPromoCodeBlockTitle: HTMLElement = document.createElement('p');
  appliedPromoCodeBlockTitle.classList.add('applied-promo-code-block__title')
  appliedPromoCodeBlockTitle.textContent = 'Applied promo code:'
  const appliedPromoCodeRS: HTMLElement = document.createElement('div');
  appliedPromoCodeRS.classList.add('applied-promo-code-rs');
  const appliedPromoCodeEPM: HTMLElement = document.createElement('div');
  appliedPromoCodeEPM.classList.add('applied-promo-code-epm');

  appliedPromoCodeBlock.append(
    appliedPromoCodeBlockTitle, appliedPromoCodeRS, appliedPromoCodeEPM
  )
  promoCodeBlock.append(appliedPromoCodeBlock, inputPromoCode, promoCodeText, promoCodeAdd);

  promoCodeAdd.classList.add('promo-code-none');
  appliedPromoCodeBlock.classList.add('promo-code-none');

  const btnBuyNowInCart = createMainButtons('buy now', 'button_large-size', 'cart__btn-buy-now');

  summaryContainer.append(title, productCount, total, promoCodeBlock, btnBuyNowInCart);

  return summaryContainer;
}
