export function infinitySlider() {
  const slider: HTMLDivElement = document.createElement("div");
  slider.classList.add("slider");
  const img1: HTMLDivElement = document.createElement("div");
  img1.classList.add("slider-img-1");

  const img2: HTMLDivElement = document.createElement("div");
  img2.classList.add("slider-img-2");

  const img3: HTMLDivElement = document.createElement("div");
  img3.classList.add("slider-img-3");

  slider.append(img1, img2, img3);

  const slidesArr: HTMLDivElement[] = [img3, img2, img1];

  let currentSlide = 0;

  function goToNextSlide() {
    slidesArr[currentSlide].classList.add('hide-slide');
    currentSlide = (currentSlide + 1) % slidesArr.length;
    slidesArr[currentSlide].classList.remove('hide-slide');
  }

  setInterval(goToNextSlide, 10000);

  return slider;
}


// //You can create infinity header slider: 
const addHeaderSlider = infinitySlider()