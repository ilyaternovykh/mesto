import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupElement) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__container');
  }

  //собирает данные всех полей формы
  _getInputValues() {
    this._formValue = [];
    this._inputList = this._popupElement.querySelectorAll('.popup__input');

    this._inputList.forEach((input) => {
        this._formValue[input.name] = input.value;
    });

    return this._formValue;
  }

  //добавление обработчика сабмита формы
  setEventListeners() {
    super.setEventListeners();
    // this._getInputValues()

    this._submitListener = (evt) => {
      evt.preventDefault();
      // this._getInputValues();
      // this._handleFormSubmit(this._formValue);
      this._handleFormSubmit(this._getInputValues());
    };

    this._popupElement.addEventListener('submit', this._submitListener);
  }

  //добавление сброса формы
  close() {
    super.close();

    // this._inputList.forEach((input) => {
    //   input.value = "";
    // });

    this._form.reset();

    this._popupElement.removeEventListener('submit', this._submitListener);
  }
}
