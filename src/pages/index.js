import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Api} from '../components/Api.js';
import {PopupWithSubmit} from '../components/PopupWithSubmit.js';

import {
  showPopupProfile,
  showPopupCards,
  showPopupAvatar,
  popupProfile,
  popupAvatar,
  popupCards,
  popupCardsDelete,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  formElement,
  formElementCard,
  formElementAvatar,
  nameInput,
  jobInput,
  popupImageContainer,
  container,
  templateElement,
  validationConfig,
} from '../utils/constants.js'


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '62447ab3-7516-4840-91dc-81dbab840843',
    'Content-Type': 'application/json'
  }
});

function renderLoading(isLoading, popupElement, buttonText) {
  // const popupSubmitButtonDefault = popupElement.querySelector('.popup__submit_type_default');
  // const popupSubmitButtonLoading = popupElement.querySelector('.popup__submit_type_loading');

  const popupSubmitButton = popupElement.querySelector('.popup__submit');

  if (isLoading) {
    // popupSubmitButtonDefault.classList.add('popup__submit_hidden');
    // popupSubmitButtonLoading.classList.remove('popup__submit_hidden');
    popupSubmitButton.textContent = 'Сохранение...';

  } else {
    // popupSubmitButtonDefault.classList.remove('popup__submit_hidden');
    // popupSubmitButtonLoading.classList.add('popup__submit_hidden');

    popupSubmitButton.textContent = buttonText;
  }
}

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

const popupWithImage = new PopupWithImage(popupImageContainer);
const addFormValidator = new FormValidator(validationConfig, formElement);
const addFormValidatorCard = new FormValidator(validationConfig, formElementCard);
const addFormValidatorAvatar = new FormValidator(validationConfig, formElementAvatar);
// const userInfo = new UserInfo(profileTitle, profileSubtitle, api);
const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar);

// const profilePopupWithForm = new PopupWithForm(
//   {
//     handleFormSubmit: (data) => {
//       const buttonText = popupProfile.querySelector('.popup__submit').textContent;

//       renderLoading(true, popupProfile, buttonText);
//       userInfo.saveUserInfo(data);
//       renderLoading(false, popupProfile, buttonText);
//       profilePopupWithForm.close();
//     }
//   },
//   popupProfile
// );

api.getAllData()
.then(promises => {
  const [ userInfoData, initialCardsData ] = promises;

  //Сохранение информации о пользователе с сервера
  const userId = userInfoData._id;
  // profileTitle.textContent = userInfoData.name;
  // profileSubtitle.textContent = userInfoData.about;
  // profileAvatar.src = userInfoData.avatar;

  userInfo.setUserInfo(userInfoData);



  const profilePopupWithForm = new PopupWithForm(
    {
      handleFormSubmit: (data) => {
        const buttonText = popupProfile.querySelector('.popup__submit').textContent;

        renderLoading(true, popupProfile, buttonText);
        // userInfo.saveUserInfo(data);

        api.editUserInfo({name: data.profile__name, about: data.profile__about})
        .then((userData) => {
          userInfo.setUserInfo(userData)
          renderLoading(false, popupProfile, buttonText);
          profilePopupWithForm.close();
        })
        .catch((err) => console.log(err));

        // renderLoading(false, popupProfile, buttonText);
        // profilePopupWithForm.close();
      }
    },
    popupProfile
  );

  const cardDeletePopup = new PopupWithSubmit(popupCardsDelete);

  const createCard = (cardData) => {
    const card = new Card({
      data: cardData,
      handleDeleteIconClick: (id) => {
        cardDeletePopup.setSubmitAction((evt) => {
          evt.preventDefault();
          const buttonText = popupCardsDelete.querySelector('.popup__submit').textContent;

          renderLoading(true, popupCardsDelete, buttonText);
          api.removeCard(id).then(() => {
                card.deleteCard();
                renderLoading(false, popupCardsDelete, buttonText);
                cardDeletePopup.close();
              }).catch(err => console.error(err))
        })
        cardDeletePopup.open();
      },
      handleLikeClick: (id) => {
        api.likeCard(id).then((cardDataLike) => {
          card.setLikeCount(cardDataLike);
        }).catch(err => console.error(err))
      },
      handleDislikeLikeClick: (id) => {
        api.dislikeLikeCard(id).then((cardDataLike) => {
          card.setLikeCount(cardDataLike);
        }).catch(err => console.error(err))
      }
    }, userId, templateElement, handleCardClick);

    return card.generateCard();
  };

  const cardsList = new Section({
    items: initialCardsData,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardsList.addItem(cardElement);
    },
  },
  container
  );

  const cardPopupWithForm = new PopupWithForm(
    {
      handleFormSubmit: (data) => {
        const buttonText = popupCards.querySelector('.popup__submit').textContent;
        const cardForApi = api.addNewCard({name: data.name, link: data.link});

        renderLoading(true, popupCards, buttonText);

        cardForApi.then((cardData) => {
          // container.prepend(createCard(cardData));
          cardsList.prependItem(createCard(cardData));
          renderLoading(false, popupCards, buttonText);
          cardPopupWithForm.close();
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    popupCards
  );

  const avatarPopupWithForm = new PopupWithForm(
    {
      handleFormSubmit: (data) => {
        const buttonText = popupAvatar.querySelector('.popup__submit').textContent;
        const avatarForApi = api.editUserAvatar({avatar: data.link});

        renderLoading(true, popupAvatar, buttonText);
        avatarForApi.then((avatarData) => {
          // profileAvatar.src = avatarData.avatar;
          userInfo.setUserInfo(avatarData);
          renderLoading(false, popupAvatar, buttonText);
          avatarPopupWithForm.close();
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    popupAvatar
  );


  cardsList.renderItems();

  showPopupCards.addEventListener('click', function() {
    addFormValidatorCard.resetValidation();
    cardPopupWithForm.open();
  })

  showPopupAvatar.addEventListener('click', function() {
    addFormValidatorAvatar.resetValidation();
    avatarPopupWithForm.open();
  })

  showPopupProfile.addEventListener('click', function() {
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().about;

    addFormValidator.resetValidation();

    profilePopupWithForm.open();
  })
})
.catch(err => console.error(err))


addFormValidator.enableValidation();
addFormValidatorCard.enableValidation();
addFormValidatorAvatar.enableValidation();
