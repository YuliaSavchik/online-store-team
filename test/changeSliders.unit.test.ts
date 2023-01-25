import "jsdom-global/register";
import {
  changePriceSlider,
  changeStockSlider,
} from "../src/components/changeSliders";
import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";
import * as chai from "chai";

chai.should();
chai.expect;

@suite("changePriceSlider function")
class testChangePriceSlider {
  @test "should set the range slider with the correct values"() {
    document.body.innerHTML = `
    <div class="range-slider__range-price"></div>
    <div class="value_min-price"></div>
    <div class="value_max-price"></div>
`;
    changePriceSlider(10, 20);
    const minValuePrice = document.querySelector(
      ".value_min-price"
    ) as HTMLDivElement;
    const maxValuePrice = document.querySelector(
      ".value_max-price"
    ) as HTMLDivElement;

    expect(minValuePrice.innerHTML).to.equal("10$");
    expect(maxValuePrice.innerHTML).to.equal("20$");
  }
}

@suite("changeStockSlider function")
class testChangeStockSlider {
  @test "should set the range slider with the correct values"() {
    document.body.innerHTML = `
    <div class="range-slider__range-stock"></div>
    <div class="value_min-stock"></div>
    <div class="value_max-stock"></div>
`;
    changeStockSlider(5, 15);
    const minValueStock = document.querySelector(
      ".value_min-stock"
    ) as HTMLDivElement;
    const maxValueStock = document.querySelector(
      ".value_max-stock"
    ) as HTMLDivElement;

    expect(minValueStock.innerHTML).to.equal("5");
    expect(maxValueStock.innerHTML).to.equal("15");
  }
}
