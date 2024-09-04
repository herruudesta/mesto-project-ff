import { cardTemplate } from "..";

import { deleteOwnCard, placeLikeCard, dislikeCard } from "./api";

// Функция лайка карточки

export const cardLike = (likeButton, cardId, likeCounter) => {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    placeLikeCard(cardId)
      .then((cardData) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = cardData.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    dislikeCard(cardId)
      .then((cardData) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = cardData.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Функция создания карточки

export function createCard(cardData, removeCard, cardLike, openImage, cardId) {
  const cardContent = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardContent.querySelector(".card__title").textContent = cardData.name;

  const cardImage = cardContent.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => {
    openImage(cardData);
  });

  const likeButton = cardContent.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    cardLike(likeButton, cardData._id, likeCounter);
  });

  if (cardData.likes.some((item) => item._id === cardId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  const likeCounter = cardContent.querySelector(".card__like-counter");

  likeCounter.textContent = cardData.likes.length;

  const deleteButton = cardContent.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    removeCard(cardContent, cardData._id);
  });

  if (cardId === cardData.owner._id) {
    deleteButton.classList.add("card__delete-button_is-visible");
  } else {
    deleteButton.classList.add("card__delete-button_is-hidden");
  }

  return cardContent;
}

// Функция удаления карточкиe

export function removeCard(cardСontent, cardId) {
  deleteOwnCard(cardId)
    .then(() => {
      cardСontent.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}
