import {Popup} from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  _setEventListeners() {
    super._setEventListeners();

    this._popupElement.addEventListener('submit', this._handleSubmitCallback);
  }

  close() {
    super.close();

    this._popupElement.removeEventListener('submit', this._handleSubmitCallback);
  }
}
