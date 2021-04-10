import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initial-сards.js';


const showPopupProfile = document.querySelector('.profile__edit-button');
const showPopupCards = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__container');
const formElementCard = document.querySelector('.popup__container_type_cards');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const titleInput = popupCards.querySelector('.popup__input_type_title');
const linkInput = popupCards.querySelector('.popup__input_type_image-link');
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const container = document.querySelector('.cards');
const templateElement = document.querySelector('.card-template');

const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const addFormValidator = new FormValidator(validationConfig, formElement);
addFormValidator.enableValidation();

const addFormValidatorCard = new FormValidator(validationConfig, formElementCard);
addFormValidatorCard.enableValidation();

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

const closePopupEsc = (evt) => {
  if (evt.key == 'Escape') {
    const activePopup = document.querySelector('.popup_opened');

    closePopup(activePopup);
  }
};

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

const handleCardClick = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageContainer.querySelector('.popup__image-title').textContent = name;

  openPopup(popupImageContainer);
}

const createCard = (data, template, handleCardClick) => {
  const card = new Card(data, template, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
};

function addCardFormListener(evt) {
  evt.preventDefault();
  const inputTitle = titleInput.value;
  const inputLink = linkInput.value;

  const newCard = createCard({name: inputTitle, link: inputLink}, templateElement, handleCardClick);

  container.prepend(newCard);


  closePopup(popupCards);
}

function renderGrid() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item, templateElement, handleCardClick);

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

  addFormValidatorCard.resetValidation();

  openPopup(popupCards);
})

popupProfile.addEventListener('submit', editProfileFormSubmitHandler);
popupCards.addEventListener('submit', addCardFormListener);

renderGrid();
