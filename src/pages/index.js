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

api.getAllData()
.then(promises => {
  const [ userInfoData, initialCardsData ] = promises;

  //Сохранение информации о пользователе с сервера
  const userId = userInfoData._id;
  profileTitle.textContent = userInfoData.name;
  profileSubtitle.textContent = userInfoData.about;
  profileAvatar.src = userInfoData.avatar;

  const cardDeletePopup = new PopupWithSubmit(popupCardsDelete);

  const createCard = (cardData) => {
    const card = new Card({
      data: cardData,
      handleDeleteIconClick: (id) => {
        cardDeletePopup.setSubmitAction((evt) => {
          evt.preventDefault();
          api.removeCard(id).then(() => {
                card.deleteCard();
                cardDeletePopup.close();
              }).catch(err => console.error(err))
        })
        cardDeletePopup.open();
      },
      handleLikeClick: (id) => {
        api.likeCard(id).then((cardDataLike) => {
          card.setLikeCount(cardDataLike);
        })
      },
      handleDislikeLikeClick: (id) => {
        api.dislikeLikeCard(id).then((cardDataLike) => {
          card.setLikeCount(cardDataLike);
        })
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
        dataLoading(true, popupCards);
        const cardForApi = api.addNewCard({name: data.name, link: data.link});
        cardForApi.then((cardData) => {
          container.prepend(createCard(cardData));
          dataLoading(false, popupCards);
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
        dataLoading(true, popupAvatar);
        const avatarForApi = api.editUserAvatar({avatar: data.link});
        avatarForApi.then((avatarData) => {
          profileAvatar.src = avatarData.avatar;
          dataLoading(false, popupAvatar);
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
})
.catch(err => console.error(err))


// const createCard = (cardData) => {
//   const card = new Card({
//     data: cardData,
//     handleDeleteIconClick: () => {
//       api.removeCard(id).then(res => {
//         card.removeCard()
//       }).catch(err => console.error(err))


//       // const cardDeletePopup = new PopupWithSubmit(popupCardsDelete);
//       // cardDeletePopup.open();
//     }
//   }, templateElement, handleCardClick);

//   return card.generateCard();
// };



// const deleteCard = () => {
//   const cardDeletePopup = new PopupWithSubmit(popupCardsDelete);

//   cardDeletePopup.open();
// };

function dataLoading(isLoading, popupElement) {
  const popupSubmitButtonDefault = popupElement.querySelector('.popup__submit_type_default');
  const popupSubmitButtonLoading = popupElement.querySelector('.popup__submit_type_loading');

  if (isLoading) {
    popupSubmitButtonDefault.classList.add('popup__submit_hidden');
    popupSubmitButtonLoading.classList.remove('popup__submit_hidden');
  } else {
    popupSubmitButtonDefault.classList.remove('popup__submit_hidden');
    popupSubmitButtonLoading.classList.add('popup__submit_hidden');
  }
}

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}



const popupWithImage = new PopupWithImage(popupImageContainer);
const addFormValidator = new FormValidator(validationConfig, formElement);
const addFormValidatorCard = new FormValidator(validationConfig, formElementCard);
const addFormValidatorAvatar = new FormValidator(validationConfig, formElementAvatar);

const userInfo = new UserInfo(profileTitle, profileSubtitle, api);

// const userFromApi = api.getUserInfo();
// userFromApi.then((data) => {
//   const userId = data._id;
//   profileTitle.textContent = data.name;
//   profileSubtitle.textContent = data.about;
//   profileAvatar.src = data.avatar;
// }).catch((err) => {
//   console.log(err);
// });


// const cardsFromApi = api.getInitialCards();
// cardsFromApi.then((data) => {
//   const cardsList = new Section({
//     items: data,
//     renderer: (cardItem) => {
//       const cardElement = createCard(cardItem);

//       cardsList.addItem(cardElement);
//     },
//   },
//   container
//   );
//   cardsList.renderItems();
// }).catch((err) => {
//   console.log(err);
// });



// const cardsList = new Section({
//   items: initialCards,
//   renderer: (cardItem) => {
//     const cardElement = createCard(cardItem);

//     cardsList.addItem(cardElement);
//   },
// },
// container
// );

// const profilePopupWithForm = new PopupWithForm(
// {
//   handleFormSubmit: (data) => {
//     userInfo.setUserInfo(data)
//     profilePopupWithForm.close();
//   }
// },
// popupProfile
// );

const profilePopupWithForm = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      dataLoading(true, popupProfile);
      userInfo.saveUserInfo(data);
      dataLoading(false, popupProfile);
      profilePopupWithForm.close();
    }
  },
  popupProfile
  );



// const cardPopupWithForm = new PopupWithForm(
//   {
//     handleFormSubmit: (data) => {

//       container.prepend(createCard(data));
//       cardPopupWithForm.close();
//     }
//   },
//   popupCards
// );



// const cardPopupWithForm = new PopupWithForm(
//   {
//     handleFormSubmit: (data) => {
//       const cardForApi = api.addNewCard({name: data.name, link: data.link});
//       cardForApi.then((cardData) => {
//         container.prepend(createCard(cardData));
//         cardPopupWithForm.close();
//       }).catch((err) => {
//         console.log(err);
//       });
//     }
//   },
//   popupCards
// );

showPopupProfile.addEventListener('click', function() {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;

  addFormValidator.resetValidation();

  profilePopupWithForm.open();
})

// showPopupCards.addEventListener('click', function() {
//   addFormValidatorCard.resetValidation();
//   cardPopupWithForm.open();
// })

addFormValidator.enableValidation();
addFormValidatorCard.enableValidation();
addFormValidatorAvatar.enableValidation();

// cardsList.renderItems();
