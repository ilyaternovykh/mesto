import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';

import {
  initialCards,
  showPopupProfile,
  showPopupCards,
  popupProfile,
  popupCards,
  profileTitle,
  profileSubtitle,
  formElement,
  formElementCard,
  nameInput,
  jobInput,
  popupImageContainer,
  container,
  templateElement,
  validationConfig
} from '../utils/constants.js'


const addFormValidator = new FormValidator(validationConfig, formElement);
addFormValidator.enableValidation();

const addFormValidatorCard = new FormValidator(validationConfig, formElementCard);
addFormValidatorCard.enableValidation();

const handleCardClick = (name, link) => {
  const popup = new PopupWithImage(popupImageContainer, name, link);

  popup.open();
}

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, templateElement, handleCardClick);
      const cardElement = card.generateCard();

      cardsList.addItem(cardElement);
    },
  },
  container
);

const userInfo = new UserInfo(profileTitle, profileSubtitle);

const profilePopupWithForm = new PopupWithForm(
  {handleFormSubmit: (data) => {
    userInfo.setUserInfo(data)
    profilePopupWithForm.close();
  }},
  popupProfile);


showPopupProfile.addEventListener('click', function() {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;

  addFormValidator.resetValidation();

  profilePopupWithForm.open();
})

showPopupCards.addEventListener('click', function() {

  addFormValidatorCard.resetValidation();

  const cardPopupWithForm = new PopupWithForm(
    {
      handleFormSubmit: (data) => {
        const newCard = new Card(data, templateElement, handleCardClick);

        container.prepend(newCard.generateCard());
        cardPopupWithForm.close();
      }
    },
    popupCards
  );

  cardPopupWithForm.open();
})


cardsList.renderItems();
