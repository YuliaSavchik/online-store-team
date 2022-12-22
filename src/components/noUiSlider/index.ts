import noUiSlider from 'nouislider';
import { target } from '../../../node_modules/nouislider/dist/nouislider';

//title it's price or stock
export function createNoUiSliderBlock(title: string) {
  const container: HTMLElement = document.createElement('div');
  container.classList.add('range-slider-block');

  const rangeTitle: HTMLElement = document.createElement('p');
  rangeTitle.classList.add('range-slider-block__title');
  rangeTitle.textContent = `${title}`;

  const rangeSlider = createNoUiSlider(title);
  container.append(rangeTitle, rangeSlider);

  return container;
}

function createNoUiSlider(title: string) {
  const rangeTitle = title.toLocaleLowerCase();
  const rangeSlider: HTMLElement = document.createElement('div');
  rangeSlider.classList.add('range-slider');

  const minValue: HTMLElement = document.createElement('div');
  minValue.classList.add('range-slider__value');
  minValue.classList.add(`value_min-${rangeTitle}`);

  const maxValue: HTMLElement = document.createElement('div');
  maxValue.classList.add('range-slider__value');
  maxValue.classList.add(`value_max-${rangeTitle}`);
  
  const range: HTMLElement = document.createElement('div');
  range.classList.add(`range-slider__range-${rangeTitle}`);

  rangeSlider.append(minValue, range, maxValue);

  return rangeSlider;
}

function initPriceNoUiSlider() {
  const range: target = document.querySelector('.range-slider__range-price') as target;
  const minValue = document.querySelector('.value_min-price') as HTMLElement;
  const maxValue = document.querySelector('.value_max-price') as HTMLElement;

  if (!range || !minValue || !maxValue) return;

  const inputsValue = [minValue, maxValue];

  noUiSlider.create(range, {
    start: [10, 500],
    connect: true,
    range: {
      'min': 10,
      'max': 500
    },
    step: 10,
    
  })

  range.noUiSlider?.on('update', function(values, handle){
    const num = Number(values[handle]);
    inputsValue[handle].innerHTML = `${String(Math.ceil(num))}$`;
  })
}

function initStockNoUiSlider() {
  const range: target = document.querySelector('.range-slider__range-stock') as target;
  const minValue = document.querySelector('.value_min-stock') as HTMLElement;
  const maxValue = document.querySelector('.value_max-stock') as HTMLElement;

  if (!range || !minValue || !maxValue) return;

  const inputsValue = [minValue, maxValue];

  noUiSlider.create(range, {
    start: [1, 100],
    connect: true,
    range: {
      'min': 1,
      'max': 100
    },
    step: 1,
    
  })

  range.noUiSlider?.on('update', function(values, handle){
    const num = Number(values[handle]);
    inputsValue[handle].innerHTML = `${String(Math.ceil(num))}`;
  })
}

const init = () => {
  initPriceNoUiSlider();
  initStockNoUiSlider();
}

window.addEventListener('DOMContentLoaded', init);
