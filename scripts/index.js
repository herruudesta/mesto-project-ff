// @todo: Темплейт карточки

let cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

let cardPlacement = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(cardShowing, removeCard) {
  const cardContent = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);

  const deleteButton = cardContent.querySelector(".card__delete-button");

  cardContent.querySelector(".card__title").textContent = cardShowing.name;

  const cardImage = cardContent.querySelector(".card__image");

  cardImage.src = cardShowing.link;
  cardImage.alt = cardShowing.name;

  deleteButton.addEventListener("click", removeCard);

  return cardContent;
}

// @todo: Функция удаления карточки

function removeCard() {
  const deleteButton = document.querySelector(".card__delete-button");

  const placesItem = deleteButton.closest(".places__item.card");

  placesItem.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (cardShowing) {
  const cardContent = createCard(cardShowing, removeCard);

  cardPlacement.append(cardContent);
});
