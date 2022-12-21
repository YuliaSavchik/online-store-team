export function createInputCoutnInCart() {
  const inputCount: HTMLElement = document.createElement('div');
  inputCount.classList.add('input-count');
  const input: HTMLInputElement = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('pattern', '^[0-9]+$');
  input.setAttribute('value', '1');
  input.classList.add('input-count__number');
  const btnPlus: HTMLElement = document.createElement('div');
  btnPlus.classList.add('input-count__btn-count');
  btnPlus.classList.add('btn-count_plus');
  const btnMinus: HTMLElement = document.createElement('div');
  btnMinus.classList.add('input-count__btn-count');
  btnMinus.classList.add('btn-count_minus');
  inputCount.append(btnMinus, input, btnPlus);
  
  return inputCount;
}


