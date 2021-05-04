export const showPopupProfile = document.querySelector('.profile__edit-button');
export const showPopupCards = document.querySelector('.profile__add-button');
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupCards = document.querySelector('.popup_type_cards');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');
export const formElement = document.querySelector('.popup__container');
export const formElementCard = document.querySelector('.popup__container_type_cards');
export const nameInput = formElement.querySelector('.popup__input_type_name');
export const jobInput = formElement.querySelector('.popup__input_type_job');
export const popupImageContainer = document.querySelector('.popup_type_image');
export const container = document.querySelector('.cards');
export const templateElement = document.querySelector('.card-template');

export const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
