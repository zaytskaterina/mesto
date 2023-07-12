import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// селекторы попапа - редактировать профиль
const popupEdit = document.querySelector(".popup_type_edit");
const nameEdit = popupEdit.querySelector(".popup__input_elem_name");
const jobEdit = popupEdit.querySelector(".popup__input_elem_job");
const formEdit = popupEdit.querySelector(".popup__form");

// селекторы попапа - добавить карточку
const popupAdd = document.querySelector(".popup_type_add");
const namePlaceAdd = popupAdd.querySelector(".popup__input_elem_name-place");
const linkAdd = popupAdd.querySelector(".popup__input_elem_link");
const formAdd = popupAdd.querySelector(".popup__form");

// селекторы попапа - картинки
const popupImage = document.querySelector(".popup_type_image");
const popupImageTitle = popupImage.querySelector(".popup__subtitle");
const popupImageLink = popupImage.querySelector(".popup__image");

// селекторы секции profile
const profile = document.querySelector(".profile");
const nameProfile = profile.querySelector(".profile__name");
const jobProfile = profile.querySelector(".profile__job");
const profileEditButton = profile.querySelector(".profile__edit-button");
const cardAddButton = profile.querySelector(".profile__add-button");

const gallery = document.querySelector(".gallery");

const popupCloseButtons = document.querySelectorAll(".popup__close");

function addCard(container, card) {
  container.prepend(card);
}

function createCard(place) {
  const card = new Card(place, "#place-template");
  return card.generateCard(openPopupImage);
}

function render(items) {
  items.forEach((item) => addCard(gallery, createCard(item)));
}

// {{{ функции с логикой для popup's
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  removeHandlerListenersPopup(popup);
}

function openPopup(popup) {
  openPopup.popupOpened = popup;
  popup.classList.add("popup_opened");
  setHandlerListenersPopup(popup);
}

function editFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameEdit.value;
  jobProfile.textContent = jobEdit.value;
  closePopup(popupEdit);
}

function addFormSubmit(evt) {
  evt.preventDefault();
  addCard(
    gallery,
    createCard({ name: namePlaceAdd.value, link: linkAdd.value })
  );
  formAdd.reset();
  popupAddValidation.setDefaultForm();
  closePopup(popupAdd);
}

function openEditProfilePopup() {
  openPopup(popupEdit);
  nameEdit.value = nameProfile.textContent;
  jobEdit.value = jobProfile.textContent;
  popupEditValidation.setDefaultForm();
}

function openAddCardPopup() {
  openPopup(popupAdd);
  popupAddValidation.setDefaultForm();
}

export function openPopupImage(place) {
  openPopup(popupImage);
  popupImageTitle.textContent = place.name;
  popupImageLink.src = place.link;
  popupImageLink.alt = place.name;
}

function setHandlerListenersPopup(popup) {
  document.addEventListener("keydown", handleCloseEsc);
  popup.addEventListener("click", handleCloseByOverlay);
}
//  }}}

function handleCloseEsc(evt) {
  evt.key === "Escape" && closePopup(openPopup.popupOpened);
}

function handleCloseByOverlay(evt) {
  evt.target.classList.contains("popup") && closePopup(openPopup.popupOpened);
}

function removeHandlerListenersPopup(popup) {
  document.removeEventListener("keydown", handleCloseEsc);
  popup.removeEventListener("click", handleCloseByOverlay);
}

profileEditButton.addEventListener("click", openEditProfilePopup);
cardAddButton.addEventListener("click", openAddCardPopup);

formEdit.addEventListener("submit", editFormSubmit);
formAdd.addEventListener("submit", addFormSubmit);

popupCloseButtons.forEach((closeButton) =>
  closeButton.addEventListener("click", () => {
    closePopup(closeButton.closest(".popup"));
  })
);

const popupAddValidation = new FormValidator(validationConfig, popupAdd);
const popupEditValidation = new FormValidator(validationConfig, popupEdit);
popupAddValidation.enableValidation();
popupEditValidation.enableValidation();

render(initialCards);
