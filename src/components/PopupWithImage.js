import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    super.open();
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupTitle = this._popupSelector.querySelector('.popup__image-title');


    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupTitle.textContent = this._name;
  }
}
