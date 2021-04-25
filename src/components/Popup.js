export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
  }

  open() {
    this._popupElement.classList.add('popup_opened');

    this._setEventListeners();
    this._handleEscClose();
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.closePopupEsc);
    this._popupElement.removeEventListener('click', this._popupClose);
  }

  _handleEscClose() {
    this.closePopupEsc = (evt) => {
      if (evt.key == 'Escape') {

        this.close();
      }
    }

    document.addEventListener('keydown', this.closePopupEsc);
  }

  _setEventListeners() {
    this._popupClose = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close()
      }
    };

    this._popupElement.addEventListener('click', this._popupClose);
  }
}
