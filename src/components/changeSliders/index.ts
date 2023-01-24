import { target } from "nouislider";

export function changePriceSlider(numPriceMin: number, numPriceMax: number) {
  const rangePrice: target = document.querySelector(
    ".range-slider__range-price"
  ) as target;
  const minValuePrice = document.querySelector(
    ".value_min-price"
  ) as HTMLElement;
  const maxValuePrice = document.querySelector(
    ".value_max-price"
  ) as HTMLElement;

  const inputsValuePrice = [minValuePrice, maxValuePrice];

  rangePrice.noUiSlider?.set([numPriceMin, numPriceMax]);
  inputsValuePrice[0].innerHTML = String(numPriceMin) + "$";
  inputsValuePrice[1].innerHTML = String(numPriceMax) + "$";
}

export function changeStockSlider(numStockMin: number, numStockMax: number) {
  const rangeStock: target = document.querySelector(
    ".range-slider__range-stock"
  ) as target;
  const minValueStock = document.querySelector(
    ".value_min-stock"
  ) as HTMLElement;
  const maxValueStock = document.querySelector(
    ".value_max-stock"
  ) as HTMLElement;

  const inputsValueStock = [minValueStock, maxValueStock];

  rangeStock.noUiSlider?.set([numStockMin, numStockMax]);
  inputsValueStock[0].innerHTML = String(numStockMin);
  inputsValueStock[1].innerHTML = String(numStockMax);
}
