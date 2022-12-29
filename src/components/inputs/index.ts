import { products } from "../../data/data";

export function createInputCoutnInCart(id: number) {
  const inputCount: HTMLElement = document.createElement('div');
  inputCount.classList.add('input-count');
  const input: HTMLElement = document.createElement('div');
  input.textContent = `${products[id - 1].initialQuality}`;
  input.setAttribute('id', `input-id-${id}`);
  input.classList.add('input-count__number');
  const btnPlus: HTMLElement = document.createElement('div');
  btnPlus.setAttribute('data-idbtn', `${id}`);
  btnPlus.classList.add('input-count__btn-count');
  btnPlus.classList.add('btn-count_plus');
  const btnMinus: HTMLElement = document.createElement('div');
  btnMinus.setAttribute('data-idbtn', `${id}`);
  btnMinus.classList.add('input-count__btn-count');
  btnMinus.classList.add('btn-count_minus');
  inputCount.append(btnMinus, input, btnPlus);
  
  return inputCount;
}

export function createInputs(type: string, placeholder: string) {
  const input: HTMLInputElement = document.createElement('input');
  input.setAttribute('type', `${type}`);
  input.setAttribute('placeholder', `${placeholder}`);
  input.classList.add('input');

  return input;
}

export function createSearchInput() {
  const input = createInputs('text', 'Search');
  input.classList.add('input-search');
  input.classList.add('input-search_bg-img');
  
  return input;
}
