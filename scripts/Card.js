// import {templateElement} from './utils.js';
import {initialCards} from './initial-сards.js';

// console.log(templateElement);

export class Card {
  constructor(data, cardTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content
    .querySelector('.cards__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.cards__title').textContent = this._name;
    this._element.querySelector('.cards__image').src = this._link;

    return this._element;
  }
}
