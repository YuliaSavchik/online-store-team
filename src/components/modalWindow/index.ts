import { createInputs } from "../inputs/index";
import { createMainButtons } from "../buttons/index";
import App from "../../pages/app/index";
import { productsInCart } from "../../index";
import { showCountProductInCartIco, showTotalSumInHeader } from "../../pages/cart/index";
import { updateURL } from "../../pages/app/index";

export function createModalWindow() {
  const shadowContainer: HTMLElement = document.createElement('div');
  shadowContainer.classList.add('modal-window__shadow');

  const modalWindow: HTMLElement = document.createElement('form');
  modalWindow.setAttribute('action', '#');
  modalWindow.setAttribute('novalidate', 'novalidate');
  modalWindow.classList.add('modal-window');

  const title: HTMLElement = document.createElement('p');
  title.classList.add('modal-window__title');
  title.textContent = 'personal information';

  const inputNameBox: HTMLElement = document.createElement('div');
  inputNameBox.classList.add('modal-window__input-box');
  const inputName = createInputs('text', 'name');
  inputName.classList.add('modal-window__input');
  inputName.classList.add('input-name');
  inputName.setAttribute('data-reg', '([а-яА-ЯёЁa-zA-Z]{3,})+ ([а-яА-ЯёЁa-zA-Z]{3,})+$');
  inputNameBox.append(inputName);

  const inputPhoneBox: HTMLElement = document.createElement('div');
  inputPhoneBox.classList.add('modal-window__input-box');
  const inputPhone = createInputs('tel', 'phone namber');
  inputPhone.classList.add('modal-window__input');
  inputPhone.classList.add('input-phone');
  inputPhone.setAttribute('data-reg', '^(([+*])+([0-9]){9,})$');
  inputPhoneBox.append(inputPhone);

  const inputAdressBox: HTMLElement = document.createElement('div');
  inputAdressBox.classList.add('modal-window__input-box');
  const inputAdress = createInputs('text', 'delivery adress');
  inputAdress.classList.add('modal-window__input');
  inputAdress.classList.add('input-adress');
  inputAdress.setAttribute('data-reg', '([а-яА-ЯёЁa-zA-Z0-9-/,.]{5,})+ ([а-яА-ЯёЁa-zA-Z0-9-/,.]{5,})+ ([а-яА-ЯёЁa-zA-Z0-9-/,.]{5,})+$');
  inputAdressBox.append(inputAdress);

  const inputEmailBox: HTMLElement = document.createElement('div');
  inputEmailBox.classList.add('modal-window__input-box');
  const inputEmail = createInputs('email', 'e-mail');
  inputEmail.classList.add('modal-window__input');
  inputEmail.classList.add('input-email');
  inputEmail.setAttribute('data-reg', '^([a-z0-9_-]+[.])*[a-z0-9_-]+@[a-z0-9_-]+([.][a-z0-9_-]+)*[.][a-z]{2,6}$');
  inputEmailBox.append(inputEmail);

  const subTitle: HTMLElement = document.createElement('p');
  subTitle.classList.add('modal-window__title');
  subTitle.textContent = 'credit card';

  const creditCardInfo: HTMLElement = document.createElement('div');
  creditCardInfo.classList.add('modal-window__credit-card-block');

  const fieldOne: HTMLElement = document.createElement('div');
  fieldOne.classList.add('credit-card-block__field');
  const creditIco: HTMLElement = document.createElement('div');
  creditIco.classList.add('credit-card-ico');

  const inputCardNumBox: HTMLElement = document.createElement('div');
  inputCardNumBox.classList.add('modal-window__input-box');
  const inputCardNum = createInputs('text', 'card number');
  inputCardNum.classList.add('input-card-number');
  inputCardNumBox.append(inputCardNum);

  fieldOne.append(creditIco, inputCardNumBox);

  const fieldTwo: HTMLElement = document.createElement('div');
  fieldTwo.classList.add('credit-card-block__field');

  const inputCardDateBox: HTMLElement = document.createElement('div');
  inputCardDateBox.classList.add('modal-window__input-box');
  const inputCardDate = createInputs('text', 'date: --/--');
  inputCardDate.classList.add('input-card-date');
  inputCardDateBox.append(inputCardDate)

  const inputCvvBox: HTMLElement = document.createElement('div');
  inputCvvBox.classList.add('modal-window__input-box');
  const inputCvv = createInputs('text', 'cvv');
  inputCvv.classList.add('input-card-cvv');
  inputCvv.setAttribute('data-reg', '[0-9]{3}');
  inputCvvBox.append(inputCvv);

  fieldTwo.append(inputCardDateBox, inputCvvBox);
  creditCardInfo.append(fieldOne, fieldTwo);

  const btnConfirm = createMainButtons('confirm', 'button_large-size', 'btn-confirm');
  btnConfirm.setAttribute('type', 'submit');

  modalWindow.append(
    title, 
    inputNameBox, 
    inputPhoneBox, 
    inputAdressBox,
    inputEmailBox,
    subTitle,
    creditCardInfo,
    btnConfirm
  );
  shadowContainer.append(modalWindow);
  const container = document.body;
  container.append(shadowContainer);
  addSpacesBetweenNumderCard();
  addSleshBetweenDataCard();
  limitLengthCvvCode();
  addEventListenerForForm();
}

function addDevisionsBetweenNumber(input: HTMLInputElement, countInStr: number, countSubstr: string) {
  const events: string[]  = ['input', 'change', 'blur', 'keyup'];
  for (const i in events) {
    input.addEventListener(events[i], formatCardCode, false);
  }
  function formatCardCode(this: {value: string}) {
    let cardCode: string | null = this.value.replace(/[^\d]/g, '').substring(0, countInStr);
    if (countSubstr === '2') {
      cardCode = cardCode != '' ? (cardCode.match(/.{1,2}/g)?.join('/') ?? null) : '';
    } else if (countSubstr === '4') {
      cardCode = cardCode != '' ? (cardCode.match(/.{1,4}/g)?.join(' ') ?? null) : '';
    }
    this.value = cardCode as string;
  }
}

function limitLengthCvvCode() {
  const input = document.querySelector<HTMLInputElement>('.input-card-cvv');
  if (!input) return;

  const events: string[]  = ['input', 'change', 'blur', 'keyup'];
  for (const i in events) {
    input.addEventListener(events[i], formatCardCode, false);
  }
  function formatCardCode(this: {value: string}) {
    const cardCode: string | null = this.value.replace(/[^\d]/g, '').substring(0, 3);
    this.value = cardCode as string;
  }
}

function addSpacesBetweenNumderCard() {
  const input = document.querySelector<HTMLInputElement>('.input-card-number');
  if (!input) return;
  
  addDevisionsBetweenNumber(input, 16, '4');
}

function addSleshBetweenDataCard() {
  const input = document.querySelector<HTMLInputElement>('.input-card-date');
  if (!input) return;
  
  addDevisionsBetweenNumber(input, 4, '2');
}

function createErrorStyle(input: HTMLInputElement, text: string) {
  const inputBox = input.parentNode as HTMLElement; 
  inputBox.classList.add('input_error');

  const errorText: HTMLElement = document.createElement('p');
  errorText.classList.add('input_error-text');
  errorText.textContent = `${text}`;
  
  inputBox.append(errorText);
}

function removeErrorStyle(input: HTMLInputElement) {
  const inputBox = input.parentNode as HTMLElement;

  if (inputBox.classList.contains('input_error')) {
    inputBox.querySelector('.input_error-text')?.remove();
    inputBox.classList.remove('input_error');
  }

}

function validation(form: HTMLFormElement) {
  let result = true;

  form.querySelectorAll('input').forEach((input) => {
    removeErrorStyle(input);
    if (input.value === '') {
      createErrorStyle(input, 'The field is not filled!');
      result = false;
    }
    else if (input.value !== '' 
              && !input.classList.contains('input-card-date') 
              && !input.classList.contains('input-card-number')) {
      const value = input.value;
      const inputReg = input.getAttribute('data-reg');
      const regExp = new RegExp(inputReg as string);
      
      if (!regExp.test(value)) {
        createErrorStyle(input, 'The value is incorrect!');
        result = false;
      } else {
        removeErrorStyle(input);
      }
    }
    else if (input.value !== '' && input.classList.contains('input-card-date')) {
      const value = input.value;
      if (((Number(value[0]) === 0 && Number(value[1]) > 0) 
          || (Number(value[0]) === 1 && Number(value[1]) <= 2))
          && (Number(value[3]) >= 2 && Number(value[4]) >= 3)) {
        removeErrorStyle(input);
      } else {
        createErrorStyle(input, 'The value is incorrect!');
        result = false;
      }
    }
    else if (input.value !== '' && input.classList.contains('input-card-number')) {
      const value = input.value;
      if (value.length !== 19) {
        createErrorStyle(input, 'The value is incorrect!');
        result = false;
      } else {
        removeErrorStyle(input);
      }
    }
  })

  return result;
}

function createMessageAboutSuccessfulOrder() {
  const wrapper: HTMLElement = document.createElement('div');
  wrapper.classList.add('message-about-order');
  const message: HTMLElement = document.createElement('p');
  message.classList.add('message-about-order__message');
  message.textContent = 'Your order has been successfully placed.';
  wrapper.append(message);
  return wrapper;
}

function addEventListenerForForm() {
  const form = document.querySelector<HTMLFormElement>('.modal-window');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validation(form) === true) {
      const container = document.body;
      const message = createMessageAboutSuccessfulOrder();
      container.append(message);

      setTimeout(() => {
        message.remove();
        const modal = document.querySelector<HTMLElement>('.modal-window__shadow');
        if (!modal) return;
        modal.remove();
        App.renderNewPage('main-page');
        updateURL('main-page');
        productsInCart.length = 0;
        showCountProductInCartIco();
        showTotalSumInHeader();
      }, 3000);
      
    } 
  })
}

