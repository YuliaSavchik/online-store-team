export function createNoUiSliderBlock(title: string, min: number | string, max: number | string) {
  const container: HTMLElement = document.createElement('div');
  container.classList.add('range-slider-block');

  const rangeTitle: HTMLElement = document.createElement('p');
  rangeTitle.classList.add('range-slider-block__title');
  rangeTitle.textContent = `${title}`;

  const rangeSlider = createNoUiSlider(min, max);
  container.append(rangeTitle, rangeSlider);

  return container;
}

function createNoUiSlider(min: number | string, max: number | string) {
  const rangeSlider: HTMLElement = document.createElement('div');
  rangeSlider.classList.add('range-slider');

  const minValue: HTMLElement = document.createElement('div');
  minValue.classList.add('range-slider__value');
  minValue.classList.add('value_min');
  minValue.textContent = `${min}`;

  const maxValue: HTMLElement = document.createElement('div');
  maxValue.classList.add('range-slider__value');
  maxValue.classList.add('value_max');
  maxValue.textContent = `${max}`;

  const range: HTMLElement = document.createElement('div');
  range.classList.add('range-slider__range')

  rangeSlider.append(minValue, range, maxValue);

  return rangeSlider;
}
