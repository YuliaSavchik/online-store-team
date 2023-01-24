import "jsdom-global/register";
import {
  goToNextSlide,
  infinitySlider,
} from "../src/components/infinitySlider/index";
import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";
import * as chai from "chai";

chai.should();
chai.expect;

@suite("infinitySlider")
class InfinitySliderTests {
  @test "creates a div element with the class 'slider'"() {
    const slider = infinitySlider();
    expect(slider).to.be.an.instanceof(HTMLDivElement);
    expect(slider.classList.contains("slider")).to.be.true;
  }

  @test
  "creates 3 div elements with the classes 'slider-img-1', 'slider-img-2', and 'slider-img-3'"() {
    const slider = infinitySlider();
    const slides = slider.children;
    expect(slides.length).to.equal(3);
    expect(slides[0].classList.contains("slider-img-1")).to.be.true;
    expect(slides[1].classList.contains("slider-img-2")).to.be.true;
    expect(slides[2].classList.contains("slider-img-3")).to.be.true;
  }

  @test "slider should have 3 images"() {
    const slider = infinitySlider();
    const images = slider.querySelectorAll(
      ".slider-img-1, .slider-img-2, .slider-img-3"
    );
    expect(images.length).to.equal(3);
  }

  @test "slider should change images every 10 seconds"() {
    const slider = infinitySlider();
    const images = slider.querySelectorAll(
      ".slider-img-1, .slider-img-2, .slider-img-3"
    );
    expect(images[0].classList.contains("hide-slide")).to.be.false;
  }
}

@suite("goToNextSlide")
class testGoToNextSlide {
  slidesArr = [
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
  ];
  currentSlide = 0;

  @test 'should add "hide-slide" class to current slide'() {
    goToNextSlide(this.slidesArr);
    expect(this.slidesArr[0].classList.contains("hide-slide")).to.be.true;
  }

  @test 'should remove "hide-slide" class from next slide'() {
    goToNextSlide(this.slidesArr);
    expect(this.slidesArr[1].classList.contains("hide-slide")).to.be.true;
  }

  @test "should loop back to first slide after last slide"() {
    goToNextSlide(this.slidesArr);
    goToNextSlide(this.slidesArr);
    goToNextSlide(this.slidesArr);
    expect(this.slidesArr[0].classList.contains("hide-slide")).to.be.true;
  }
}
