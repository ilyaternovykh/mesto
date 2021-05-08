export class Card {
  constructor({ data, handleDeleteIconClick, handleLikeClick, handleDislikeLikeClick }, userId, cardTemplateSelector, handleCardClick, api) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._like = data.likes;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeLikeClick = handleDislikeLikeClick;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
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
    this._likeCount = this._element.querySelector('.cards__like-count');

    this._setEventListeners();

    this._element.querySelector('.cards__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCount.textContent = this._like.length;

    if(this._userId === this._ownerId) {
      this._trashButton.classList.add('cards__trash_visible');
    }

    this._like.forEach((like) => {
      if(like._id === this._userId) {
        this._likeButton.classList.add('cards__like_active');
      }
    });

    return this._element;
  }

  setLikeCount(dataLike) {
    this._likeCount.textContent = dataLike.likes.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if(this._likeButton.classList.contains('cards__like_active')) {
        this._handleDislikeLikeClick(this._cardId);
        this._likeButton.classList.remove('cards__like_active');
      } else {
        this._handleLikeClick(this._cardId);
        this._likeButton.classList.add('cards__like_active');
      }
    });
    this._trashButton.addEventListener('click', () => {
      //this._deleteCardClick();
      this._handleDeleteIconClick(this._cardId);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // _handleLikeClick() {
  //   this._likeButton.classList.toggle('cards__like_active')
  // }

  _deleteCardClick() {
    this._trashButton.closest('.cards__item').remove();
  }

  deleteCard() {
    this._trashButton.closest('.cards__item').remove();
  }
}
