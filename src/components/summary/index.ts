import { createInputs } from "../inputs/index";
import { createMainButtons } from "../buttons/index";
import { activPromoCode, local } from "../../pages/app/index";
import { countSumProductInCart } from "../../pages/cart/index";

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
  total.innerHTML = 'total: ';
  total.append(totalSum);

  const inputBlock: HTMLElement = document.createElement('div');

  const inputPromoCode = createInputs('text', 'enter promo code');
  inputPromoCode.classList.add('summary-container__input-promo-code');

  const promoCodeText: HTMLElement = document.createElement('p');
  promoCodeText.classList.add('promo-code-text');
  promoCodeText.textContent = 'promo code: RS, EPM';
  inputBlock.append(inputPromoCode, promoCodeText);

  const promoCodeContainer: HTMLElement = document.createElement('div');
  promoCodeContainer.classList.add('promo-code-container');
  
  const addingPromoCodeBlock: HTMLElement = document.createElement('div');
  addingPromoCodeBlock.classList.add('promo-code-container__adding-block');

  const appliedPromoCodeBlock: HTMLElement = document.createElement('div');
  appliedPromoCodeBlock.classList.add('promo-code-container__applied-block');

  const totalPromoCodeBlock: HTMLElement = document.createElement('div');
  totalPromoCodeBlock.classList.add('promo-code-container__total-block');

  promoCodeContainer.append(addingPromoCodeBlock, appliedPromoCodeBlock, totalPromoCodeBlock);

  const btnBuyNowInCart = createMainButtons('buy now', 'button_large-size', 'cart__btn-buy-now');

  summaryContainer.append(title, productCount, total, inputBlock,  promoCodeContainer, btnBuyNowInCart);

  if (activPromoCode.length > 0) {
    createPromoBlockIfCodeAdding();
  }

  return summaryContainer;
}

export function createAddingPromoCodeBlock(code: string) {
  const namePromoCode: HTMLElement = document.createElement('p');
  namePromoCode.classList.add('adding-block__promo-name');
  const promoCodeBtn: HTMLButtonElement = document.createElement('button');
  promoCodeBtn.classList.add('promo-code-btn');
  promoCodeBtn.classList.add(`promo-btn-add_${code}`);
  promoCodeBtn.textContent = 'add';
  promoCodeBtn.setAttribute('data-id', `${code}`);
  if (code === 'RS') {
    namePromoCode.textContent = 'RSSchool - 10%';
  } else if (code === 'EPM') {
    namePromoCode.textContent = 'EPAM System - 10%';
  }

  const container = document.querySelector<HTMLElement>('.promo-code-container__adding-block');
  if (!container) return;

  container.append(namePromoCode, promoCodeBtn);
  return container;


}

export function createAppliedPromoCodeBlock(code: string) {
  const block: HTMLElement = document.createElement('div');
  block.classList.add('applied-block');
  block.classList.add(`applied-block_${code}`);
  const namePromoCode: HTMLElement = document.createElement('p');
  namePromoCode.classList.add('applied-block__promo-name');
  const promoCodeBtn: HTMLButtonElement = document.createElement('button');
  promoCodeBtn.classList.add('promo-code-btn');
  promoCodeBtn.classList.add(`promo-btn-drop_${code}`);
  promoCodeBtn.setAttribute('data-id', `${code}`);
  promoCodeBtn.textContent = 'drop';
  block.append(namePromoCode, promoCodeBtn)
  if (code === 'RS') {
    namePromoCode.textContent = 'Applide RSSchool code - 10%';
  } else if (code === 'EPM') {
    namePromoCode.textContent = 'Applide EPAM System code - 10%';
  }

  const container = document.querySelector<HTMLElement>('.promo-code-container__applied-block');
  if (!container) return;

  container.append(block);
  return container;
}

export function createTotalWitnPromo(sum: number) {
  const total: HTMLElement = document.createElement('p');
  total.classList.add('total-block__total-with-promo');
  total.textContent = 'Total: ';
  const totalSum: HTMLElement = document.createElement('span');
  totalSum.classList.add('total-with-promo__sum');
  totalSum.textContent = `${sum}`;
  total.append(totalSum);

  const container = document.querySelector<HTMLElement>('.promo-code-container__total-block');
  if (!container) return;

  container.append(total);
  return container;
}

export function changeBlockTotalWitnPromo() {
  const totalWithPromoBlock = document.querySelector<HTMLElement>('.total-block__total-with-promo');
  if (!totalWithPromoBlock) return;
  totalWithPromoBlock.remove();
}

export function addUnderlineForMainTotal() {
  const mainTotal = document.querySelector<HTMLElement>('.summary-container__total');
  if (!mainTotal) return;

  mainTotal.classList.add('total-with-promo');
}

export function removeUnderlineForMainTotal() {
  const mainTotal = document.querySelector<HTMLElement>('.summary-container__total');
  if (!mainTotal) return;

  mainTotal.classList.remove('total-with-promo');
}

export function addStyleForSummary() {
  const summary = document.querySelector<HTMLElement>('.summary-container');
  if (!summary) return;

  summary.classList.add('add-promo-block');
}

export function removeStyleForSummary() {
  const summary = document.querySelector<HTMLElement>('.summary-container');
  if (!summary) return;

  summary.classList.remove('add-promo-block');
}

export function showAvailablePromoCode() {
  const input = document.querySelector<HTMLInputElement>('.summary-container__input-promo-code');
  if(!input) return;
  const containerForPromo = document.querySelector<HTMLElement>('.promo-code-container__adding-block');
  if(!containerForPromo) return;

  input?.addEventListener('input', () => {
    if (activPromoCode.length === 0) {
      if (input.value === 'RS') {
        createAddingPromoCodeBlock('RS');
      }
      else if (input.value === 'EPM') {
        createAddingPromoCodeBlock('EPM');
      }
      else {
        containerForPromo.innerHTML = '';
      }
    }
    else if (activPromoCode.length === 1) {
      if (input.value === 'RS') {
        if (activPromoCode[0] !== 'RS') {
          createAddingPromoCodeBlock(input.value);
        } 
        else if (activPromoCode[0] === 'RS') {
          containerForPromo.innerHTML = '';
        }
      } 
      else if (input.value === 'EPM') {
        if (activPromoCode[0] !== 'EPM') {
          createAddingPromoCodeBlock(input.value);
        }
        else if (activPromoCode[0] === 'EPM') {
          containerForPromo.innerHTML = '';
        }
      }
      else {
        containerForPromo.innerHTML = '';
      }
    }
    else if (activPromoCode.length === 2) {
      containerForPromo.innerHTML = '';
    }
  })
}

export function addingPromoCode(btnId: string) {
  const container = document.querySelector<HTMLElement>('.promo-code-container__adding-block');
  if (!container) return;

  if (btnId === 'RS') {
    activPromoCode.push(btnId);
    addStyleForSummary();
    createAppliedPromoCodeBlock(btnId);
    container.innerHTML = '';
  } 
  else if (btnId === 'EPM') {
    activPromoCode.push(btnId);
    addStyleForSummary();
    createAppliedPromoCodeBlock(btnId);
    container.innerHTML = '';
  }

  addDiscount();
  local.setItem('activPromoCode', JSON.stringify(activPromoCode));
}

function countSumWithPromo(percent: number, total: number) {
  const percentOfSum = (total / 100) * percent;
  const result = Math.round(total - percentOfSum);
  return result;
}

export function addDiscountToTotalCount(percent: number) {
  const totalSum = countSumProductInCart();
  const totalSumWithDiscount = countSumWithPromo(percent, totalSum);
  return totalSumWithDiscount;
}

export function addDiscount() {

  if (activPromoCode.length === 1) {
    const totalSum = addDiscountToTotalCount(10);
    addUnderlineForMainTotal();
    createTotalWitnPromo(totalSum);
  }
  else if (activPromoCode.length === 2) {
    const totalSum = addDiscountToTotalCount(20);
    addUnderlineForMainTotal();
    changeBlockTotalWitnPromo();
    createTotalWitnPromo(totalSum);
  }
}

function countSumDelitePromo(percent: number, total: number, discount: number) {
  const percentOfSum = (total / 100) * percent;
  const result = Math.round(discount + percentOfSum);
  return result;
}

export function removeDiscountToTotalCount(percent: number) {
  const totalSum = countSumProductInCart();
  const totalSpan = document.querySelector('.total-with-promo__sum') as HTMLElement;
  const totalDiscount = Number(totalSpan.textContent);
  const totalSumWithoutDiscount = countSumDelitePromo(percent, totalSum, totalDiscount);
  return totalSumWithoutDiscount;
}

export function removeDiscount() {
  if (activPromoCode.length === 1) {
    const totalSum = removeDiscountToTotalCount(10);
    changeBlockTotalWitnPromo();
    createTotalWitnPromo(totalSum);
  }
  else if (activPromoCode.length === 0) {
    changeBlockTotalWitnPromo();
    removeUnderlineForMainTotal();
    removeStyleForSummary();
  }
  local.setItem('activPromoCode', JSON.stringify(activPromoCode));
}

export function decreaseDiscountWhenDecreaseProduct() {
  if (activPromoCode.length === 1) {
    const totalSum = countSumProductInCart();
    const percentOfSum = (totalSum / 100) * 10;
    const result = Math.round(totalSum - percentOfSum); 
    changeBlockTotalWitnPromo();
    createTotalWitnPromo(result);
  }
  else if (activPromoCode.length === 2) {
    const totalSum = countSumProductInCart();
    const percentOfSum = (totalSum / 100) * 20;
    const result = Math.round(totalSum - percentOfSum); 
    changeBlockTotalWitnPromo();
    createTotalWitnPromo(result);
  }
}

function removePromoCodeFromArr(code: string, arr: string[]) {
  const index = arr.findIndex((item) => item === code);
  return arr.splice(index, 1);
}

export function removePromoCodeRS(btnId: string) {
  const blockRS = document.querySelector<HTMLElement>('.applied-block_RS');
  if (!blockRS) return;

  blockRS.remove();
  removePromoCodeFromArr(btnId, activPromoCode);
  removeDiscount();

}

export function removePromoCodeEPM(btnId: string) {
  const blockEPM = document.querySelector<HTMLElement>('.applied-block_EPM');
  if (!blockEPM) return;

  blockEPM.remove();
  removePromoCodeFromArr(btnId, activPromoCode);
  removeDiscount();
}

export function createPromoBlockIfCodeAdding() {
  if (activPromoCode.length === 0) {
    return;
  } 
  else if (activPromoCode.length === 1) {
    createAppliedPromoCodeBlock(activPromoCode[0]);
    addDiscount();
    addStyleForSummary();
  } 
  else if (activPromoCode.length === 2) {
    activPromoCode.forEach((code) => {
      createAppliedPromoCodeBlock(code);
    })
    addDiscount();
    addStyleForSummary();
  }
}
const wrapperForPage = (document.querySelector('.main') as HTMLElement);

wrapperForPage?.addEventListener('click', function(event: Event) {
  const item = event.target;

  if ((item as HTMLElement).closest('.promo-btn-add_RS')) {
    const dataSetId = (item as HTMLElement).dataset.id;
    addingPromoCode(dataSetId as string);
  }

  if ((item as HTMLElement).closest('.promo-btn-add_EPM')) {
    const dataSetId = (item as HTMLElement).dataset.id;
    addingPromoCode(dataSetId as string);
  }

  if ((item as HTMLElement).closest('.promo-btn-drop_RS')) {
    const dataSetId = (item as HTMLElement).dataset.id;
    removePromoCodeRS(dataSetId as string);
  }

  if ((item as HTMLElement).closest('.promo-btn-drop_EPM')) {
    const dataSetId = (item as HTMLElement).dataset.id;
    removePromoCodeEPM(dataSetId as string);
  }
})
