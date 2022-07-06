import Popup from "./Popup.js";

export default class PopupWithDeleteConfirm extends Popup {
  constructor({ popupSelector, handleClick }) {
    super(popupSelector);
    this._handleClick = handleClick;
    this._button = document.querySelector(".popup__button-confirm");
  }

  open() {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
    this._button.addEventListener("click", (e) => {
      this._handleClick(this._card);
    });
  }
}
