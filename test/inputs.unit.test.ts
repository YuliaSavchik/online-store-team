import "jsdom-global/register";
import {
  createInputCoutnInCart,
  createInputs,
  createSearchInput,
} from "../src/components/inputs";
import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";
import * as chai from "chai";

chai.should();
chai.expect;

@suite("createInputCoutnInCart")
class CreateInputCountInCartTests {
  @test
  "creates a div element with the input-count class and the provided product id"() {
    const inputCount = createInputCoutnInCart(1);
    expect(
      Object.prototype.toString.call(inputCount) === "[object HTMLDivElement]"
    ).to.be.true;
    expect(inputCount.classList.contains("input-count")).to.be.true;
    expect(inputCount.querySelector("#input-id-1")).to.exist;
  }
}

@suite("createInputs")
class CreateInputsTests {
  @test "creates an input element with the provided type and placeholder"() {
    const input = createInputs("text", "Username");
    expect(
      Object.prototype.toString.call(input) === "[object HTMLInputElement]"
    ).to.be.true;
    expect(input.getAttribute("type")).to.equal("text");
    expect(input.getAttribute("placeholder")).to.equal("Username");
    expect(input.classList.contains("input")).to.be.true;
  }
}

@suite("createSearchInput")
class CreateSearchInputTests {
  @test
  "creates an input element with the type 'text' and placeholder 'Search', as well as the class 'input-search'"() {
    const input = createSearchInput();
    expect(
      Object.prototype.toString.call(input) === "[object HTMLInputElement]"
    ).to.be.true;
    expect(input.getAttribute("type")).to.equal("text");
    expect(input.getAttribute("placeholder")).to.equal("Search");
    expect(input.classList.contains("input-search")).to.be.true;
    expect(input.classList.contains("input-search_bg-img")).to.be.true;
  }
}
