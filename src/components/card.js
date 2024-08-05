import { cardTemplate } from "../index";

// Функция создания карточки

export function createCard(cardData, removeCard, openImage, cardLike) {
  const cardContent = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);

  cardContent.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardContent.querySelector(".card__delete-button");

  const likeButton = cardContent.querySelector(".card__like-button");

  const cardImage = cardContent.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  likeButton.addEventListener("click", cardLike);
  cardImage.addEventListener("click", () => openImage(cardData));
  deleteButton.addEventListener("click", () => removeCard(cardContent));

  return cardContent;
}

// Функция лайка карточки

export function cardLike(evt) {
  const cardElement = evt.target.closest(".card");
  const putLike = cardElement.querySelector(".card__like-button");
  putLike.classList.toggle("card__like-button_is-active");
}

// Функция удаления карточки

export function removeCard(cardData) {
  cardData.remove();
}
