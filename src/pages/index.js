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
  popupProfile,
  popupCards,
  popupCardsDelete,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  formElement,
  formElementCard,
  nameInput,
  jobInput,
  popupImageContainer,
  container,
  templateElement,
  validationConfig
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
        const cardId = id;
        cardDeletePopup.setSubmitAction((evt) => {
          evt.preventDefault();
          api.removeCard(cardId).then(() => {
                card.deleteCard();
                cardDeletePopup.close();
              }).catch(err => console.error(err))
        })
        cardDeletePopup.open();
      }
      // handleDeleteIconClick: (id) => {
      //   api.removeCard(id).then(() => {
      //     card.deleteCard()
      //   }).catch(err => console.error(err))


      //   // const cardDeletePopup = new PopupWithSubmit(popupCardsDelete);
      //   // cardDeletePopup.open();
      // }
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
        const cardForApi = api.addNewCard({name: data.name, link: data.link});
        cardForApi.then((cardData) => {
          container.prepend(createCard(cardData));
          cardPopupWithForm.close();
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    popupCards
  );


  cardsList.renderItems();

  showPopupCards.addEventListener('click', function() {
    addFormValidatorCard.resetValidation();
    cardPopupWithForm.open();
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

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}



const popupWithImage = new PopupWithImage(popupImageContainer);
const addFormValidator = new FormValidator(validationConfig, formElement);
const addFormValidatorCard = new FormValidator(validationConfig, formElementCard);

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
      userInfo.saveUserInfo(data)
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

// cardsList.renderItems();
