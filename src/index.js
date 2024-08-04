import "./pages/index.css";

import { initialCards } from "./components/cards";

import { openPopup, closePopup } from "./components/modal.js";

import { createCard, removeCard } from "./components/card.js";

// @todo: Темплейт карточки и её расположение.

export const cardTemplate = document.querySelector("#card-template").content;

export const cardPlacement = document.querySelector(".places__list");

// Вывести карточки на страницу

initialCards.forEach(function (cardData) {
  const cardContent = createCard(cardData, removeCard, openImage);

  cardPlacement.append(cardContent);
});

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
});

closeForm.addEventListener("click", () => {
  closePopup(addNewCardPopup);
});

// Функция добавления новой карточки на страницу.

function handleFormAdd(evt) {
  evt.preventDefault();

  const newPlace = createCard(
    { name: newPlaceName.value, link: newPlaceURL.value },
    removeCard,
    openImage
  );

  cardPlacement.prepend(newPlace);

  closePopup(addNewCardPopup);

  addForm.reset();
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
  popupInputsValue();
  addForm.reset();
});

closeEditor.addEventListener("click", () => {
  closePopup(profileEditPopup);
});

// Сохранение полей ввода формы.

function popupInputsValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}
// Обработчик отправки формы.

function handleFormSubmit(evt) {
  evt.preventDefault();

  const jobValue = jobInput.value;
  const nameValue = nameInput.value;

  popupInputsValue(nameValue, jobValue);
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closePopup(profileEditPopup);
}

editForm.addEventListener("submit", handleFormSubmit);
