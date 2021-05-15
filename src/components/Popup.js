export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
  }

  open() {
    this._popupElement.classList.add('popup_opened');

    this._setEventListeners();
    // this._handleEscClose();
    document.addEventListener('keydown', this._closePopupEsc);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupEsc);
    this._popupElement.removeEventListener('click', this._handlePopupClose);
  }

  // _handleEscClose() {
  //   this.closePopupEsc = (evt) => {
  //     if (evt.key == 'Escape') {

  //       this.close();
  //     }
  //   }

  //   document.addEventListener('keydown', this.closePopupEsc);
  // }

  _closePopupEsc = (evt) => {
    if (evt.key == 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._handlePopupClose = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close()
      }
    };

    this._popupElement.addEventListener('click', this._handlePopupClose);
  }
}
