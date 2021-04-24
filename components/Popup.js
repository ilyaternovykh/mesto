export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');

    this.setEventListeners();
    this._handleEscClose();
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.closePopupEsc);
    this._popupSelector.removeEventListener('click', this._popupClose);
  }

  _handleEscClose() {
    this.closePopupEsc = (evt) => {
      if (evt.key == 'Escape') {

        this.close();
      }
    }

    document.addEventListener('keydown', this.closePopupEsc);
  }

  setEventListeners() {
    this._popupClose = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close()
      }
    };

    this._popupSelector.addEventListener('click', this._popupClose);
  }
}
