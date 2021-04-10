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
// const popupImageContainer = document.querySelector('.popup_type_image');
// const popupImage = popupImageContainer.querySelector('.popup__image');
// const popupImageTitle = popupImageContainer.querySelector('.popup__image-title');
const closePopupButtonImage = popupImageContainer.querySelector('.popup__close_type_image');
const container = document.querySelector('.cards');
// const templateElement = document.querySelector('.card-template');



// function openPopupImage(evt) {
//   popupImage.src = evt.target.src;
//   popupImage.alt = evt.target.alt;
//   popupImageTitle.textContent = evt.target.alt;

//   openPopup(popupImageContainer);
// }

// function deleteCard(evt) {
//   const target = evt.target;
//   const currentCard = target.closest('.cards__item');

//   currentCard.remove();
// }

// function likeCard(evt) {
//   evt.target.classList.toggle('cards__like_active');
// }

// function addCardListeners(card) {
//   const deleteButton = card.querySelector('.cards__trash');
//   deleteButton.addEventListener('click', deleteCard);

//   const likeButton = card.querySelector('.cards__like');
//   likeButton.addEventListener('click', likeCard);

//   const popupImageCard = card.querySelector('.cards__image');
//   popupImageCard.addEventListener('click', openPopupImage)
// }

// function createCardDomNode(item) {
//   const newItem = templateElement.content.cloneNode(true);
//   const title = newItem.querySelector('.cards__title');
//   const image = newItem.querySelector('.cards__image');

//   title.textContent = item.name;
//   image.src = item.link;
//   image.alt = item.name;

//   addCardListeners(newItem);

//   return newItem;
// }

// function addCardFormListener(evt) {
//   evt.preventDefault();
//   const inputTitle = titleInput.value;
//   const inputLink = linkInput.value;

//   const newCard = createCardDomNode({name: inputTitle, link: inputLink});

//   container.prepend(newCard);

//   inputTitle.value = "";
//   inputLink.value = "";
//   closePopup(popupCards);
// }

function addCardFormListener(evt) {
  evt.preventDefault();
  const inputTitle = titleInput.value;
  const inputLink = linkInput.value;

  const newCard = new Card({name: inputTitle, link: inputLink}, templateElement);
  const cardElement = newCard.generateCard();

  container.prepend(cardElement);

  // inputTitle.value = "";
  // inputLink.value = "";
  closePopup(popupCards);
}

// function renderGrid() {
//   const result = initialCards.map(function(item) {
//     const newCard = createCardDomNode(item);

//     return newCard;
//   });

//   container.append(...result);
// }

function renderGrid() {
  initialCards.forEach((item) => {
    const card = new Card(item, templateElement);
    const cardElement = card.generateCard();

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
