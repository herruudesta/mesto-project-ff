// Функция открытия попапа.

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  popup.addEventListener("mousedown", closeByOverlay);

  document.addEventListener("keydown", closeByEscape);
}

// Функция закрытия попапа.

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  popup.removeEventListener("mousedown", closeByOverlay);

  document.removeEventListener("keydown", closeByEscape);
}

// Функция закрытия попапа нажатием на оверлей.

function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

// Функция закрытия попапа нажатием на Escape.

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}
