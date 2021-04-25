import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);

  }

  open(name, link) {
    super.open();
    this._name = name;
    this._link = link;

    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupTitle = this._popupElement.querySelector('.popup__image-title');


    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupTitle.textContent = this._name;
  }
}
