(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_is-opened"),e.addEventListener("mousedown",r),document.addEventListener("keydown",o)}function n(e){e.classList.remove("popup_is-opened"),e.removeEventListener("mousedown",r),document.removeEventListener("keydown",o)}function r(e){e.target===e.currentTarget&&n(e.currentTarget)}function o(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function c(e,t,n,r){var o=p.querySelector(".places__item.card").cloneNode(!0);o.querySelector(".card__title").textContent=e.name;var c=o.querySelector(".card__delete-button"),u=o.querySelector(".card__like-button"),a=o.querySelector(".card__image");return a.src=e.link,a.alt=e.name,u.addEventListener("click",r),a.addEventListener("click",(function(){return n(e)})),c.addEventListener("click",(function(){return t(o)})),o}function u(e){e.target.closest(".card").querySelector(".card__like-button").classList.toggle("card__like-button_is-active")}function a(e){e.remove()}e.d({},{T:()=>p});var p=document.querySelector("#card-template").content,d=document.querySelector(".places__list");[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var t=c(e,a,m,u);d.append(t)}));var i=document.querySelector(".popup_type_image"),l=i.querySelector(".popup__image"),s=i.querySelector(".popup__caption");function m(e){l.src=e.link,l.alt=e.name,s.textContent=e.name,t(i)}i.querySelector(".popup__close").addEventListener("click",(function(){n(i)}));var _=document.querySelector(".popup_type_new-card"),y=document.querySelector(".profile__add-button"),v=_.querySelector(".popup__close"),f=document.querySelector('form[name="new-place"]'),k=document.querySelector("input[name='place-name']"),q=document.querySelector("input[name='link']");y.addEventListener("click",(function(){t(_),f.reset()})),v.addEventListener("click",(function(){n(_)})),f.addEventListener("submit",(function(e){e.preventDefault();var t=c({name:k.value,link:q.value},a,m,u);d.prepend(t),n(_),f.reset()}));var S=document.querySelector(".popup_type_edit"),g=document.querySelector(".profile__edit-button"),L=S.querySelector(".popup__close"),E=document.querySelector('form[name="edit-profile"]'),b=E.querySelector(".popup__input_type_name"),h=E.querySelector(".popup__input_type_description"),x=document.querySelector(".profile__title"),j=document.querySelector(".profile__description");function w(){b.value=x.textContent,h.value=j.textContent}g.addEventListener("click",(function(){t(S),w(),f.reset()})),L.addEventListener("click",(function(){n(S)})),E.addEventListener("submit",(function(e){e.preventDefault();var t=h.value,r=b.value;w(),x.textContent=r,j.textContent=t,n(S)}))})();