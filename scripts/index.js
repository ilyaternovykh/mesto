let showPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
// Находим форму в DOM
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input-title');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input-subtitle');// Воспользуйтесь инструментом .querySelector()

function showPopup() {
  popup.classList.add('popup_opened');

  nameInput.value = profileTitle.innerHTML;
  jobInput.value = profileSubtitle.innerHTML;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__subtitle').textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


showPopupButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', closePopup);
