const showPopupProfile = document.querySelector('.profile__edit-button');
const showPopupCards = document.querySelector('.profile__add-button');
let popupProfile = document.querySelector('.popup_type_profile');
let popupCards = document.querySelector('.popup_type_cards');
const closePopupButtonProfile = popupProfile.querySelector('.popup__close_type_profile');
const closePopupButtonCards = popupCards.querySelector('.popup__close_type_cards');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let titleInput = popupCards.querySelector('.popup__input_type_title');
let linkInput = popupCards.querySelector('.popup__input_type_image-link');

let popupImageContainer = document.querySelector('.popup_type_image');
let popupImage = popupImageContainer.querySelector('.popup__image');
let popupImageTitle = popupImageContainer.querySelector('.popup__image-title');
const closePopupButtonImage = popupImageContainer.querySelector('.popup__close_type_image');

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

function addCardFormListener(evt) {
  evt.preventDefault();
  const inputTitle = titleInput.value;
  const inputLink = linkInput.value;

  const newCard = createCardDomNode({name: inputTitle, link: inputLink});

  addCardListeners(newCard);

  container.prepend(newCard);

  inputTitle.value = "";
  inputLink.value = "";
  closePopup(popupCards);
}

function renderGrid() {
  const result = initialCards.map(function(item) {
    const newCard = createCardDomNode(item);

    addCardListeners(newCard);

    return newCard;
  });

  container.append(...result);
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

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

function deleteCard(evt) {
  const target = evt.target;
  const currentCard = target.closest('.cards__item');

  currentCard.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('cards__like_active');
}

function openPopupImage(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageTitle.textContent = evt.target.alt;

  openPopup(popupImageContainer);
}

function addCardListeners(card) {
  const deleteButton = card.querySelector('.cards__trash');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.cards__like');
  likeButton.addEventListener('click', likeCard);

  const popupImageCard = card.querySelector('.cards__image');
  popupImageCard.addEventListener('click', openPopupImage)
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

popupProfile.addEventListener('submit', formSubmitHandler);
popupCards.addEventListener('submit', addCardFormListener);

renderGrid();
