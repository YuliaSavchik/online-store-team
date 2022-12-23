import { createInputs } from "../inputs/index";
import { createMainButtons } from "../buttons/index";

export function createModalWindow() {
  const shadowContainer: HTMLElement = document.createElement('div');
  shadowContainer.classList.add('modal-window__shadow');

  const modalWindow: HTMLElement = document.createElement('form');
  modalWindow.setAttribute('action', '#');
  modalWindow.classList.add('modal-window');

  const title: HTMLElement = document.createElement('p');
  title.classList.add('modal-window__title');
  title.textContent = 'personal information';

  const inputName = createInputs('text', 'name');
  inputName.classList.add('modal-window__input');
  inputName.classList.add('input-name');

  const inputPhone = createInputs('tel', 'phone namber');
  inputPhone.classList.add('modal-window__input');
  inputPhone.classList.add('input-phone');

  const inputAdress = createInputs('text', 'delivery adress');
  inputAdress.classList.add('modal-window__input');
  inputAdress.classList.add('input-adress');

  const inputEmail = createInputs('email', 'e-mail');
  inputEmail.classList.add('modal-window__input');
  inputEmail.classList.add('input-email');

  const subTitle: HTMLElement = document.createElement('p');
  subTitle.classList.add('modal-window__title');
  subTitle.textContent = 'credit card';

  const creditCardInfo: HTMLElement = document.createElement('div');
  creditCardInfo.classList.add('modal-window__credit-card-block');

  const fieldOne: HTMLElement = document.createElement('div');
  fieldOne.classList.add('credit-card-block__field');
  const creditIco: HTMLElement = document.createElement('div');
  creditIco.classList.add('credit-card-ico');

  const inputCardNum = createInputs('text', 'card number');
  inputCardNum.classList.add('input-card-number');

  fieldOne.append(creditIco, inputCardNum);

  const fieldTwo: HTMLElement = document.createElement('div');
  fieldTwo.classList.add('credit-card-block__field');

  const inputCardDate = createInputs('text', 'date: --/--');
  inputCardDate.classList.add('input-card-date');

  const inputCvv = createInputs('text', 'cvv');
  inputCvv.classList.add('input-card-cvv');

  fieldTwo.append(inputCardDate, inputCvv);
  creditCardInfo.append(fieldOne, fieldTwo);

  const btnConfirm = createMainButtons('confirm', 'button_large-size', 'btn-confirm');
  btnConfirm.setAttribute('type', 'submit');

  modalWindow.append(
    title, 
    inputName, 
    inputPhone, 
    inputAdress,
    inputEmail,
    subTitle,
    creditCardInfo,
    btnConfirm
  );
  shadowContainer.append(modalWindow);
  const container = document.body;
  container.append(shadowContainer);
}
