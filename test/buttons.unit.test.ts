import "jsdom-global/register";
import {
  createMainButtons,
  createArrowButtons,
  createViewPageButtons,
  createSortSelect,
} from "../src/components/buttons/index";
import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";
import * as chai from "chai";

chai.should();
chai.expect;

@suite("createMainButtons")
class CreateMainButtonsTests {
  @test
  "creates a button element with the text content provided, and the class 'button', 'btnSizeClassName' and 'btnClassName'"() {
    const btn = createMainButtons("Button Content", "btn-size", "btn-class");
    expect(Object.prototype.toString.call(btn) === "[object HTMLButtonElement]")
      .to.be.true;
    expect(btn.textContent).to.equal("Button Content");
    expect(btn.classList.contains("button")).to.be.true;
    expect(btn.classList.contains("btn-size")).to.be.true;
    expect(btn.classList.contains("btn-class")).to.be.true;
  }
}

@suite("createArrowButtons")
class CreateArrowButtonsTests {
  @test
  "creates a div element with the class 'button-arrow' and a child div element with the class 'btnClassName'"() {
    const btn = createArrowButtons("btn-class");
    expect(Object.prototype.toString.call(btn) === "[object HTMLDivElement]").to
      .be.true;
    expect(btn.tagName).to.equal("DIV");
    expect(btn.classList.contains("button-arrow")).to.be.true;
    expect(btn.firstElementChild.classList.contains("btn-class")).to.be.true;
  }
}

@suite("createViewPageButtons")
class CreateViewPageButtonsTests {
  @test
  "creates a button element with the class 'button-view' and 'btnClassName'"() {
    const btn = createViewPageButtons("btn-class");
    expect(Object.prototype.toString.call(btn) === "[object HTMLButtonElement]")
      .to.be.true;
    expect(btn.classList.contains("button-view")).to.be.true;
    expect(btn.classList.contains("btn-class")).to.be.true;
  }
}

@suite("createSortSelect")
class CreateSortSelectTests {
  @test
  "creates a select element with the class 'selectClassName' and five options"() {
    const select = createSortSelect("select-class");
    expect(
      Object.prototype.toString.call(select) === "[object HTMLSelectElement]"
    ).to.be.true;
    expect(select.classList.contains("select-class")).to.be.true;
    expect(select.options.length).to.equal(5);
    expect(select.options[0].text).to.equal("SORT BY");
    expect(select.options[1].text).to.equal("asc price");
    expect(select.options[2].text).to.equal("desc price");
    expect(select.options[3].text).to.equal("asc rating");
    expect(select.options[4].text).to.equal("desc rating");
  }
}
