import {popupImageContainer, openPopup} from './utils.js';
// import {initialCards} from './initial-сards.js';

// console.log(templateElement);

export class Card {
  constructor(data, cardTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getTemplate() {
    const cardElement = this._cardTemplateSelector
    .content
    .querySelector('.cards__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.cards__title').textContent = this._name;
    this._element.querySelector('.cards__image').src = this._link;
    this._element.querySelector('.cards__image').alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.cards__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.cards__trash').addEventListener('click', () => {
      this._deleteCardClick();
    });
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._openPopupImage();
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.cards__like').classList.toggle('cards__like_active')
  }

  _deleteCardClick() {
    this._element.querySelector('.cards__trash').closest('.cards__item').remove();
  }

  _openPopupImage() {
    popupImageContainer.querySelector('.popup__image').src = this._link;
    openPopup(popupImageContainer);
  }
}
