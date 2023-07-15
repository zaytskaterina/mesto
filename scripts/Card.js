export class Card {
  constructor(place, template) {
    this._name = place.name;
    this._link = place.link;
    this._cardTemplate = template;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }

  _handleOpenPopup = () => {
    this._onOpenPopup({ name: this._name, link: this._link });
  };

  _handleDeleteCard = () => {
    this._card.remove();
  };

  _handleToggleLike = (evt) => {
    evt.target.classList.toggle("place__like_active");
  };

  _setHandlerListeners() {
    this._card
      .querySelector(".place__like")
      .addEventListener("click", this._handleToggleLike);

    this._card
      .querySelector(".place__delete")
      .addEventListener("click", this._handleDeleteCard);

    this._card
      .querySelector(".place__image")
      .addEventListener("click", this._handleOpenPopup);
  }

  generateCard(funcOpenPopupImage) {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".place__image");
    this._onOpenPopup = funcOpenPopupImage;
    this._card.querySelector(".place__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setHandlerListeners();

    return this._card;
  }
}
