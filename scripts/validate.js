const allInputsEmpty = (inputList) => {

  return !inputList.some(inputElement => inputElement.textContent.length > 0);
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const showInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
};

const checkInput = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (inputElement.validity.valid) {
    //Убрать подкрашивание красным
    //Убрать ошибку
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    //Подкрасить поле красным
    //Вывести ошибку
    showInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setInputListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      //Проверить состояние поля
      checkInput(formElement, inputElement, rest);
      //Переключить состояние кнопки
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
};

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // Навесить слушатели для полей формы
    setInputListeners(formElement, rest);
  });
};


enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
