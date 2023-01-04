export function createMainButtons(btnContent: string, btnSizeClassName: string, btnClassName: string) {
  const btn: HTMLButtonElement = document.createElement('button');
  btn.textContent = `${btnContent}`;
  btn.classList.add('button');
  btn.classList.add(btnSizeClassName);
  btn.classList.add(btnClassName);

  return btn;
}

export function createArrowButtons(btnClassName: string) {
  const btn: HTMLElement = document.createElement('div');
  btn.classList.add('button-arrow');
  const btnBg: HTMLElement = document.createElement('div');
  btnBg.classList.add(btnClassName);

  btn.append(btnBg);

  return btn;
}

export function createViewPageButtons(btnClassName: string) {
  const btn: HTMLButtonElement = document.createElement('button');
  btn.classList.add('button-view');
  btn.classList.add(btnClassName);

  return btn;
}

export function createSortSelect(selectClassName: string){
  const select : HTMLSelectElement = document.createElement('select');
  select.classList.add(selectClassName);
  const option1 : HTMLOptionElement = document.createElement('option');
  option1.innerHTML = 'SORT BY';
  const option2 : HTMLOptionElement = document.createElement('option');
  option2.innerHTML = 'ASC PRICE';
  const option3 : HTMLOptionElement = document.createElement('option');
  option3.innerHTML = 'DESC PRICE';
  const option4 : HTMLOptionElement = document.createElement('option');
  option4.innerHTML = 'ASC RATING';
  const option5 : HTMLOptionElement = document.createElement('option');
  option5.innerHTML = 'DESC RATING';
  select.append(option1, option2, option3, option4, option5);
   
  return select;
}

/* 
main page
const btnReset = createMainButtons('reset', 'button_meddium-size', 'btn-reset');
const btnCopyLink = createMainButtons('copy link', 'button_meddium-size', 'btn-copy-link');
const btnSort = createMainButtons('sort', 'button_large-size', 'btn-sopt');
const btnAdd = createMainButtons('add', 'button_small-size', 'btn-add');
const btnMore = createMainButtons('more', 'button_small-size', 'btn-more');
const btnViewThreeColums = createViewPageButtons('button-view_three-colums');
const btnViewTwoColums = createViewPageButtons('button-view_two-colums');
const btnArrowTop = createArrowButtons('button-arrow_top');
const btnArrowDown = createArrowButtons('button-arrow_down');

product description page
const btnAddToCard = createMainButtons('add to card', 'button_meddium-size', 'btn-add-card');
const btnBuyNowInDescription = createMainButtons('buy now', 'button_meddium-size', 'product-description__btn-buy-now');

cart page
const btnBuyNowInCart = createMainButtons('buy now', 'button_large-size', 'cart__btn-buy-now');
const btnArrowleft = createArrowButtons('button-arrow_left');
const btnArrowRight = createArrowButtons('button-arrow_right');

modal
const btnConfirm = createMainButtons('confirm', 'button_large-size', 'btn-confirm');
*/
