const CONFIG = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-21",
  headers: {
    authorization: "99de1408-b02e-4d74-aa87-b8d5232af731",
    "Content-Type": "application/json",
  },
};

// Загрузка информации о пользователе с сервера.

function getRespondData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function getUserInfo() {
  return fetch(`${CONFIG.baseUrl}/users/me`, {
    method: "GET",
    headers: CONFIG.headers,
  }).then(getRespondData);
}

// Загрузка карточек пользователей с сервера.

export function getInitialCards() {
  return fetch(`${CONFIG.baseUrl}/cards`, {
    method: "GET",
    headers: CONFIG.headers,
  }).then(getRespondData);
}

// Редактирование профиля и аватара.

export function editUserInfo(name, description) {
  return fetch(`${CONFIG.baseUrl}/users/me`, {
    method: "PATCH",
    headers: CONFIG.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then(getRespondData);
}

export function editUserAvatar(avatar) {
  return fetch(`${CONFIG.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: CONFIG.headers,
    body: JSON.stringify({ avatar: avatar }),
  }).then(getRespondData);
}

// Добавление и удаление новой карточки.

export function addOwnCard(name, link) {
  return fetch(`${CONFIG.baseUrl}/cards`, {
    method: "POST",
    headers: CONFIG.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(getRespondData);
}

export function deleteOwnCard(cardId) {
  return fetch(`${CONFIG.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: CONFIG.headers,
  }).then(getRespondData);
}

// Добавление и удаление лайка.

export function placeLikeCard(cardId) {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
    headers: CONFIG.headers,
    method: "PUT",
  }).then((res) => getRespondData(res));
}

export function dislikeCard(cardId) {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
    headers: CONFIG.headers,
    method: "DELETE",
  }).then(getRespondData);
}
