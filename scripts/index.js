const showPopupProfile = document.querySelector('.profile__edit-button');
const showPopupCards = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
const closePopupButtonProfile = popupProfile.querySelector('.popup__close_type_profile');
const closePopupButtonCards = popupCards.querySelector('.popup__close_type_cards');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const titleInput = popupCards.querySelector('.popup__input_type_title');
const linkInput = popupCards.querySelector('.popup__input_type_image-link');
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageTitle = popupImageContainer.querySelector('.popup__image-title');
const closePopupButtonImage = popupImageContainer.querySelector('.popup__close_type_image');
const container = document.querySelector('.cards');
const templateElement = document.querySelector('.card-template');

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

const closePopupClick = (popup) => {
    popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
  });
}

function openPopupImage(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageTitle.textContent = evt.target.alt;

  openPopup(popupImageContainer);
}

function deleteCard(evt) {
  const target = evt.target;
  const currentCard = target.closest('.cards__item');

  currentCard.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('cards__like_active');
}

function addCardListeners(card) {
  const deleteButton = card.querySelector('.cards__trash');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.cards__like');
  likeButton.addEventListener('click', likeCard);

  const popupImageCard = card.querySelector('.cards__image');
  popupImageCard.addEventListener('click', openPopupImage)
}

function createCardDomNode(item) {
  const newItem = templateElement.content.cloneNode(true);
  const title = newItem.querySelector('.cards__title');
  const image = newItem.querySelector('.cards__image');

  title.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  addCardListeners(newItem);

  return newItem;
}

function addCardFormListener(evt) {
  evt.preventDefault();
  const inputTitle = titleInput.value;
  const inputLink = linkInput.value;

  const newCard = createCardDomNode({name: inputTitle, link: inputLink});

  container.prepend(newCard);

  inputTitle.value = "";
  inputLink.value = "";
  closePopup(popupCards);
}

function renderGrid() {
  const result = initialCards.map(function(item) {
    const newCard = createCardDomNode(item);

    return newCard;
  });

  container.append(...result);
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



closePopupClick(popupProfile);
closePopupClick(popupCards);
closePopupClick(popupImageContainer);
renderGrid();
