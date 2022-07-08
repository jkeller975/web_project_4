export default class Card {
  constructor(
    { data, handleImageClick, handleDeleteCardClick, handleLikeClick },
    cardSelector,
    user
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._id = data._id;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = user._id;
    this._ownerId = data.owner._id;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    const liked = (like) => like._id === this._userId;
    return this._likes.some(liked);
  }

  setLikes(res) {
    this._likes = res.likes;

    this._renderLikes();
  }

  _toggleDeleteButton() {
    const deleteButton = this._element.querySelector(".card__delete");
    if (this._userId === this._ownerId) {
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
      this._handleLikeClick();
    });

    const imageElement = this._element.querySelector(".card__item");
    imageElement.addEventListener("click", (evt) => {
      this._handleImageClick({ link: this._link, name: this._name });
    });
  }

  handleDelete() {
    this._element.remove();
  }

  _renderLikes() {
    this._likesCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._heartButton.classList.add("card__like_active");
    } else {
      this._heartButton.classList.remove("card__like_active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._toggleDeleteButton();
    const cardItem = this._element.querySelector(".card__item");
    cardItem.src = this._link;
    cardItem.alt = this._name;
    const cardText = this._element.querySelector(".card__text");
    cardText.textContent = this._name;
    this._heartButton = this._element.querySelector(".card__like");
    this._likesCounter = this._element.querySelector(".card__like-counter");

    this._renderLikes();

    return this._element;
  }
}
