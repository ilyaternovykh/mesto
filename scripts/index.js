let showPopupProfile = document.querySelector('.profile__edit-button');
let showPopupCards = document.querySelector('.profile__add-button');
//let popup = document.querySelector('.popup');
let popupProfile= document.querySelector('.popup_type_profile');
let popupCards = document.querySelector('.popup_type_cards');
let closePopupButtonProfile = document.querySelector('.popup__close_type_profile');
let closePopupButtonCards = document.querySelector('.popup__close_type_cards');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
// Находим форму в DOM
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input_type_job');// Воспользуйтесь инструментом .querySelector()
let titleInput = popupCards.querySelector('.popup__input_type_title');
let linkInput = popupCards.querySelector('.popup__input_type_image-link');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const container = document.querySelector('.cards');
const templateElement = document.querySelector('.card-template');

function createCardDomNode(item) {
  const newItem = templateElement.content.cloneNode(true);
  const title = newItem.querySelector('.cards__title');
  const image = newItem.querySelector('.cards__image');

  title.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  return newItem;
}

function addCardListener(evt) {
  evt.preventDefault();
  const inputTitle = titleInput.value;
  const inputLink = linkInput.value;

  const newCard = createCardDomNode({name: inputTitle, link: inputLink});
  container.prepend(newCard);

  inputTitle.value = '';
  inputLink.value = '';
  closePopup(popupCards);
}

function renderGrid() {
  const result = initialCards.map(createCardDomNode);

  container.append(...result);
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
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
// function openPopup(popup) {
//   // nameInput.value = profileTitle.textContent;
//   // jobInput.value = profileSubtitle.textContent;

//   popup.classList.add('popup_opened');
// }

// function closePopup() {
//   popup.classList.remove('popup_opened');
// }

// function togglePopup(popup) {
//   popup.classList.toggle('popup_opened');
// }
// function togglePopup(evt) {
//   console.log(evt.target.closest('.popup'));
//   //popup.classList.toggle('popup_opened');
// }

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
}

// function formSubmitCards (evt) {
//   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//   console.log('Привет!')

//   //closePopup(popupProfile);
// }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupProfile.addEventListener('submit', formSubmitHandler);
popupCards.addEventListener('submit', addCardListener);

// showPopupProfile.addEventListener('click', () => {
//   openPopup(popupProfile);
// });
// // closePopupButtons.addEventListener('click', closePopup);
// showPopupCards.addEventListener('click', () => {
//   openPopup(popupCards);
// });

// showPopupProfile.addEventListener('click', togglePopup);

// showPopupCards.addEventListener('click', () => {
//   togglePopup;
// });

// closePopupButton.forEach((item) => {
//   item.addEventListener('click', closePopup);
//   console.log(item);
//   console.log(closePopup);
// });
//showPopupCards.addEventListener('click', openPopup);

// closePopupButton.addEventListener('click', () => { togglePopup(popupProfile); });
// closePopupButton.addEventListener('click', () => { togglePopup(popupCards); });

renderGrid();
