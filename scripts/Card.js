import {
  showModal,
  imageModal,
  modalImageElement,
  modalCaption,
} from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const deleteButton = this._element
      .querySelector(".card__delete")
      .addEventListener("click", (evt) => {
        this._handleDelete(evt);
      });

    const likeButton = this._element
      .querySelector(".card__like")
      .addEventListener("click", (evt) => {
        this._handleLike(evt);
      });

    const imageElement = this._element
      .querySelector(".card__item")
      .addEventListener("click", (evt) => {
        this._handlePreview(evt);
      });
  }

  _handleLike(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _handleDelete(evt) {
    evt.target.parentElement.remove();
  }

  _handlePreview(evt) {
    modalImageElement.src = evt.target.src;
    modalImageElement.alt = evt.target.alt;
    modalCaption.textContent = evt.target.alt;
    showModal(imageModal);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__item").src = this._link;
    this._element.querySelector(".card__item").alt = this._name;
    this._element.querySelector(".card__text").textContent = this._name;

    return this._element;
  }
}

export default Card;
