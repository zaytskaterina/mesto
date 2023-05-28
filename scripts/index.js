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

const popupImageContainer = document.querySelector(
  ".popup__container_type_image"
);
const popupImage = popupImageContainer.parentElement;

// селекторы секции profile
const profile = document.querySelector(".profile");
const nameProfile = profile.querySelector(".profile__name");
const jobProfile = profile.querySelector(".profile__job");
const profileEditButton = profile.querySelector(".profile__edit-button");
const cardAddButton = profile.querySelector(".profile__add-button");

const placeTemplate = document.querySelector("#place-template").content;

const gallery = document.querySelector(".gallery");

const popupCloseButtons = document.querySelectorAll(".popup__close");

const popupSubtitleContent = popupImageContainer.querySelector(".popup__subtitle")
const popupImageContent = popupImageContainer.querySelector(".popup__image")


function renderInitial() {
  const initCards = initialCards.map((place) => addCard(place));
  gallery.prepend(...initCards);
}

function renderCard() {
  const card = addCard({ name: namePlaceAdd.value, link: linkAdd.value });
  gallery.prepend(card);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  removeHandlerListenersPopup(popup);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  setHandlerListenersPopup(popup);
}

// {{{ функции с логикой для popup's
function addCard(place) {
  const card = placeTemplate.querySelector(".place").cloneNode(true);
  const cardImage = card.querySelector(".place__image");

  card
    .querySelector(".place__like")
    .addEventListener("click", (evt) =>
      evt.target.classList.toggle("place__like_active")
    );

  card
    .querySelector(".place__delete")
    .addEventListener("click", () => card.remove());

  card.querySelector(".place__title").textContent = place.name;

  cardImage.src = place.link;
  cardImage.alt = place.name;
  cardImage.addEventListener("click", () => {
    openPopupImage(place);
  });

  return card;
}

function editForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameEdit.value;
  jobProfile.textContent = jobEdit.value;
  closePopup(popupEdit);
}

function addForm(evt) {
  evt.preventDefault();
  if (namePlaceAdd.value && linkAdd.value) {
    renderCard();
  }
  closePopup(popupAdd);
}
//  }}}

function openEditProfilePopup() {
  openPopup(popupEdit);
  nameEdit.value = nameProfile.textContent;
  jobEdit.value = jobProfile.textContent;
  setDefaultForm(formEdit);
}

function openAddCardPopup() {
  openPopup(popupAdd);
  formAdd.reset();
  setDefaultForm(formAdd);
}


function openPopupImage(place) { 
    openPopup(popupImage); 
    popupSubtitleContent.textContent = place.name; 
    popupImageContent.src = place.link; 
  } 

// скрыть ошибки при открытии попапа и тогл кнопки.
function setDefaultForm(form) {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__button");
  toggleButton(inputList, button, "popup__button_disabled");
  inputList.forEach((inputElem) => {
    hideInputError(
      form,
      inputElem,
      "popup__input_type_error",
      "popup__error_visible"
    );
  });
}

function handleOverlayEscape(evt) {
  if (evt.type === "click") {
    evt.target.classList.contains("popup") ? closePopup(handleOverlayEscape.popup) : "";
  }
  if (evt.type === "keydown") {
    evt.key === "Escape" ? closePopup(handleOverlayEscape.popup) : "";
  }
}

function removeHandlerListenersPopup(popup) {
  popup.parentElement.removeEventListener("keydown", handleOverlayEscape);
  popup.removeEventListener("click", handleOverlayEscape);
}

function setHandlerListenersPopup(popup) {
  handleOverlayEscape.popup = popup;
  document.addEventListener("keydown", handleOverlayEscape);
  popup.addEventListener("click", handleOverlayEscape);
}

profileEditButton.addEventListener("click", openEditProfilePopup);
cardAddButton.addEventListener("click", openAddCardPopup);

formEdit.addEventListener("submit", editForm);
formAdd.addEventListener("submit", addForm);

popupCloseButtons.forEach((closeButton) =>
  closeButton.addEventListener("click", () => {
    closePopup(closeButton.closest(".popup"));
  })
);

renderInitial();
