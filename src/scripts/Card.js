export default class Card {
  constructor({ data, handleImageClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const deleteButton = this._element.querySelector(".card__delete");
    deleteButton.addEventListener("click", (evt) => {
      this._handleDelete(evt);
    });

    const likeButton = this._element.querySelector(".card__like");
    likeButton.addEventListener("click", (evt) => {
      this._handleLike(evt);
    });

    const imageElement = this._element.querySelector(".card__item");
    imageElement.addEventListener("click", (evt) => {
      this._handleImageClick({ link: this._link, name: this._name });
    });
  }

  _handleLike(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _handleDelete(evt) {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardItem = this._element.querySelector(".card__item");
    cardItem.src = this._link;
    cardItem.alt = this._name;
    const cardText = this._element.querySelector(".card__text");
    cardText.textContent = this._name;

    return this._element;
  }
}
