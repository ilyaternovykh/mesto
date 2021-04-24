import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

  }

  //собирает данные всех полей формы
  _getInputValues() {
    this._formValue = [];
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');

    this._inputList.forEach((input) => {
        this._formValue[input.name] = input.value;
    });

    return this._formValue;
  }

  // _formSubmit = (evt) => {
  //   evt.preventDefault();
  //   this._handleFormSubmit(this._getInputValues);
  // }

  //добавление обработчика сабмита формы
  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener('submit', (evt) => {evt.preventDefault(), this._getInputValues(), this._handleFormSubmit(this._formValue)}, {once: true});
  }

  //добавление сброса формы
  close() {
    super.close();

    this._inputList.forEach((input) => {
      input.value = "";
    });
  }
}
