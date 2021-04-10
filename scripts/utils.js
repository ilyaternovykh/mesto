

export const templateElement = document.querySelector('.card-template');
export const popupImageContainer = document.querySelector('.popup_type_image');


export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

export function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

const closePopupEsc = (evt) => {
  if (evt.key == 'Escape') {
    const activePopup = document.querySelector('.popup_opened');

    closePopup(activePopup);
  }
};

export const closePopupClick = (popup) => {
    popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
  });
}
