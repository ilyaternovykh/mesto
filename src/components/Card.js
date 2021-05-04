export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, api) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
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
    this._likeButton = this._element.querySelector('.cards__like');
    this._trashButton = this._element.querySelector('.cards__trash');
    this._cardImage = this._element.querySelector('.cards__image');

    this._setEventListeners();

    this._element.querySelector('.cards__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._trashButton.addEventListener('click', () => {
      this._deleteCardClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('cards__like_active')
  }

  _deleteCardClick() {
    this._trashButton.closest('.cards__item').remove();
  }
}
