export class FormValidator {
  constructor(enableObject, formElement) {
    this._inputSelector = enableObject.inputSelector;
    this._submitButtonSelector = enableObject.submitButtonSelector;
    this._inactiveButtonClass = enableObject.inactiveButtonClass;
    this._inputErrorClass = enableObject.inputErrorClass;
    this._errorClass = enableObject.errorClass;
    this._formElement = formElement;
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    });

    this._setInputListeners();
  }

  _setInputListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        //Проверить состояние поля
        this._checkInput(inputElement);
        //Переключить состояние кнопки
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  }

  _toggleButtonState() {
    if (this._hasInvalidInput() || this._allInputsEmpty()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _checkInput(inputElement) {
    if (inputElement.validity.valid) {
      //Убрать подкрашивание красным
      //Убрать ошибку
      this._hideInputError(inputElement);
    } else {
      //Подкрасить поле красным
      //Вывести ошибку
      this._showInputError(inputElement);
    }
  }

  _allInputsEmpty() {
    return !this._inputList.some(inputElement => inputElement.value.length > 0);
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
  }


}
