import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Api} from '../components/Api.js';

import {
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

const createCard = (cardData) => {
  const card = new Card(cardData, templateElement, handleCardClick);

  return card.generateCard();
};

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

const popupWithImage = new PopupWithImage(popupImageContainer);
const addFormValidator = new FormValidator(validationConfig, formElement);
const addFormValidatorCard = new FormValidator(validationConfig, formElementCard);
const userInfo = new UserInfo(profileTitle, profileSubtitle);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '62447ab3-7516-4840-91dc-81dbab840843',
    'Content-Type': 'application/json'
  }
});

const cards = api.getInitialCards();
cards.then((data) => {
  const cardsList = new Section({
    items: data,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);

      cardsList.addItem(cardElement);
    },
  },
  container
  );
  cardsList.renderItems();
}).catch((err) => {
  console.log(err);
});

// const cardsList = new Section({
//   items: initialCards,
//   renderer: (cardItem) => {
//     const cardElement = createCard(cardItem);

//     cardsList.addItem(cardElement);
//   },
// },
// container
// );

const profilePopupWithForm = new PopupWithForm(
{
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data)
    profilePopupWithForm.close();
  }
},
popupProfile
);

const cardPopupWithForm = new PopupWithForm(
  {
    handleFormSubmit: (data) => {

      container.prepend(createCard(data));
      cardPopupWithForm.close();
    }
  },
  popupCards
);

showPopupProfile.addEventListener('click', function() {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;

  addFormValidator.resetValidation();

  profilePopupWithForm.open();
})

showPopupCards.addEventListener('click', function() {
  addFormValidatorCard.resetValidation();
  cardPopupWithForm.open();
})

addFormValidator.enableValidation();
addFormValidatorCard.enableValidation();

// cardsList.renderItems();
