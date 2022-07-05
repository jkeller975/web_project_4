export default class Card {
  constructor(
    { data, handleImageClick, handleDeleteCardClick, handleLikeClick },
    cardSelector,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardOwnerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._id = data.id;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }

  getId() {
    return this._id;
  }

  _updateView() {
    const deleteButton = this._element.querySelector(".card__delete");
    if (this._userId === this._cardOwnerId) {
      deleteButton.classList.add("card__delete-button_active");
    }
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
      this._handleDeleteCardClick(evt);
    });

    const likeButton = this._element.querySelector(".card__like");
    likeButton.addEventListener("click", (evt) => {
      const LikeButtonActive = this._element
        .querySelector(".card__like")
        .classList.contains("card__like_active");
      console.log(LikeButtonActive);
      this._handleLikeClick(
        LikeButtonActive,
        this._id,
        this._element.querySelector(".card__like-counter")
      );
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

  handleDelete() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._updateView();
    const cardItem = this._element.querySelector(".card__item");
    cardItem.src = this._link;
    cardItem.alt = this._name;
    const cardText = this._element.querySelector(".card__text");
    cardText.textContent = this._name;

    return this._element;
  }
}
