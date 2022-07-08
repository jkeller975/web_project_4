import Popup from "./Popup.js";

export default class PopupWithDeleteConfirm extends Popup {
  constructor({ popupSelector, handleClick }) {
    super(popupSelector);
    this._handleClick = handleClick;
    this._button = document.querySelector(".popup__button-confirm");
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleClick(this._card);
    });
  }
}
