import "./pages/index.css";

import { openPopup, closePopup } from "./components/modal.js";

import { createCard, removeCard, cardLike } from "./components/card.js";

import {
  enableValidation,
  disableValidation,
} from "./components/validation.js";

import {
  getUserInfo,
  getInitialCards,
  editUserInfo,
  editUserAvatar,
  addOwnCard,
} from "./components/api.js";

// Темплейт карточки и её расположение.

export const cardTemplate = document.querySelector("#card-template").content;

const cardPlacement = document.querySelector(".places__list");

// Рендер карточек других пользователей.

const renderUsersCards = (item, userId) => {
  const cardUnit = createCard(item, removeCard, cardLike, openImage, userId);
  cardPlacement.append(cardUnit);
};

// Открытие и закрытие попапа добавления нового места.

const addNewCardPopup = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const closeForm = addNewCardPopup.querySelector(".popup__close");

const addForm = document.querySelector('form[name="new-place"]');

const newPlaceName = document.querySelector("input[name='place-name']");
const newPlaceURL = document.querySelector("input[name='link']");

addButton.addEventListener("click", () => {
  openPopup(addNewCardPopup);
  addForm.reset();
  disableValidation(addNewCardPopup, validationConfig);
});

closeForm.addEventListener("click", () => {
  closePopup(addNewCardPopup);
});

// Функция добавления новой карточки на страницу.

function handleFormAdd(evt) {
  evt.preventDefault();

  const saveButton = addForm.querySelector(".popup__button");

  saveButtonLoadingText(true, saveButton);

  const newCardName = newPlaceName.value;
  const newCardURL = newPlaceURL.value;

  addOwnCard(newCardName, newCardURL)
    .then((cardData) => {
      cardPlacement.prepend(
        createCard(
          cardData,
          removeCard,
          cardLike,
          openImage,
          cardData.owner._id
        )
      );
      closePopup(addNewCardPopup);
      addForm.reset();
    })
    .catch((err) => {
      console.log(`Ошибка добавления новой карточки: ${err}`);
    })
    .finally(() => {
      saveButtonLoadingText(false, saveButton);
    });
}

addForm.addEventListener("submit", handleFormAdd);

// Открытие и закрытие попапа редактора профиля.

const profileEditPopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const closeEditor = profileEditPopup.querySelector(".popup__close");

const editForm = document.querySelector('form[name="edit-profile"]');

const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

editButton.addEventListener("click", () => {
  openPopup(profileEditPopup);
  fillEditorsPopupInputs();
  addForm.reset();
  disableValidation(profileEditPopup, validationConfig);
});

closeEditor.addEventListener("click", () => {
  closePopup(profileEditPopup);
});

// Сохранение полей ввода формы.

function fillEditorsPopupInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Обработчик отправки формы.

function handleEditorsFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  fillEditorsPopupInputs(nameValue, jobValue);

  const saveButton = editForm.querySelector(".popup__button");

  saveButtonLoadingText(true, saveButton);

  editUserInfo(nameValue, jobValue)
    .then(() => {
      profileTitle.textContent = nameValue;
      profileDescription.textContent = jobValue;
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.log(`Ошибка изменения данных профиля: ${err}`);
    })
    .finally(() => {
      saveButtonLoadingText(false, saveButton);
    });
}

editForm.addEventListener("submit", handleEditorsFormSubmit);

// Открытие и закрытие попапа редактора аватара профиля.

const profileAvatar = document.querySelector(".profile__image");
const avatarEditor = document.querySelector(".popup_type-avatar");
const closeAvatarForm = avatarEditor.querySelector(".popup__close");

const editAvatarForm = document.forms.new__avatar;
const profileAvatarInput = editAvatarForm.elements.avatar;

const editProfileImage = () => {
  disableValidation(avatarEditor, validationConfig);
  openPopup(avatarEditor);
};

closeAvatarForm.addEventListener("click", () => {
  closePopup(avatarEditor);
});

const handleAvatarEditorFormSubmit = (evt) => {
  evt.preventDefault();

  const dataProfileAvatar = profileAvatarInput.value;
  const saveButton = editAvatarForm.querySelector(".popup__button");

  saveButtonLoadingText(true, saveButton);

  editUserAvatar(dataProfileAvatar)
    .then((avatar) => {
      profileAvatar.style.backgroundImage = `url(${avatar.avatar})`;
      closePopup(avatarEditor);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.err(`Ошибка изменения аватара: ${err}`);
    })
    .finally(() => {
      saveButtonLoadingText(false, saveButton);
    });
  closePopup(avatarEditor);
};

profileAvatar.addEventListener("click", editProfileImage);

editAvatarForm.addEventListener("submit", handleAvatarEditorFormSubmit);

// Функция открытия и закрытия изображения

const modalImageContainer = document.querySelector(".popup_type_image");

const modalImage = modalImageContainer.querySelector(".popup__image");
const imageCaption = modalImageContainer.querySelector(".popup__caption");

const closeButton = modalImageContainer.querySelector(".popup__close");

function openImage(cardData) {
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;

  imageCaption.textContent = cardData.name;

  openPopup(modalImageContainer);
}

closeButton.addEventListener("click", () => {
  closePopup(modalImageContainer);
});

// UX Сохранение... и промис.

const saveButtonLoadingText = (loadingStatus, popupSaveButton) => {
  if (loadingStatus) {
    popupSaveButton.textContent = "Сохранение...";
  } else {
    popupSaveButton.textContent = "Сохранить";
  }
};

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    const userId = userData._id;

    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    cardsData.forEach((item) => {
      renderUsersCards(item, userId);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Валидация.

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);
