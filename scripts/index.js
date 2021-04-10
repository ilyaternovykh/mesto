import { Card } from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initial-сards.js';
import {templateElement, popupImageContainer, openPopup, closePopup, closePopupClick} from './utils.js';


const showPopupProfile = document.querySelector('.profile__edit-button');
const showPopupCards = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
const closePopupButtonProfile = popupProfile.querySelector('.popup__close_type_profile');
const closePopupButtonCards = popupCards.querySelector('.popup__close_type_cards');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__container');
const formElementCard = document.querySelector('.popup__container_type_cards');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const titleInput = popupCards.querySelector('.popup__input_type_title');
const linkInput = popupCards.querySelector('.popup__input_type_image-link');
const closePopupButtonImage = popupImageContainer.querySelector('.popup__close_type_image');
const container = document.querySelector('.cards');

const createCard = (data, template) => {
  const card = new Card(data, template);
  const cardElement = card.generateCard();

  return cardElement;
};

function addCardFormListener(evt) {
  evt.preventDefault();
  const inputTitle = titleInput.value;
  const inputLink = linkInput.value;

  const newCard = createCard({name: inputTitle, link: inputLink}, templateElement);

  container.prepend(newCard);


  closePopup(popupCards);
}

function renderGrid() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item, templateElement);

    container.append(cardElement);
  });
}

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupProfile);
}



showPopupProfile.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  openPopup(popupProfile);
})

showPopupCards.addEventListener('click', function() {
  titleInput.value = "";
  linkInput.value = "";

  openPopup(popupCards);
})

closePopupButtonProfile.addEventListener('click', function() {
  closePopup(popupProfile);
})

closePopupButtonCards.addEventListener('click', function() {
  closePopup(popupCards);
})

closePopupButtonImage.addEventListener('click', function() {
  closePopup(popupImageContainer);
})

popupProfile.addEventListener('submit', editProfileFormSubmitHandler);
popupCards.addEventListener('submit', addCardFormListener);

const enableValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const addFormValidator = new FormValidator(enableValidation, formElement);
addFormValidator.enableValidation();

const addFormValidatorCard = new FormValidator(enableValidation, formElementCard);
addFormValidatorCard.enableValidation();



closePopupClick(popupProfile);
closePopupClick(popupCards);
closePopupClick(popupImageContainer);
renderGrid();
