import { cardTemplate } from "../index";

// Функция создания карточки

export function createCard(cardData, removeCard, openImage, cardLike) {
  const cardContent = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);

  const deleteButton = cardContent.querySelector(".card__delete-button");

  cardContent.querySelector(".card__title").textContent = cardData.name;

  const likeButton = cardContent.querySelector(".card__like-button");

  const cardImage = cardContent.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // Функция лайка карточки

  function cardLike() {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => cardLike(cardContent));
  cardImage.addEventListener("click", () => openImage(cardData));
  deleteButton.addEventListener("click", () => removeCard(cardContent));

  return cardContent;
}

// Функция удаления карточки

export function removeCard(cardData) {
    cardData.remove();
}
