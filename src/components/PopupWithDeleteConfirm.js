import Popup from "./Popup.js";

export default class PopupWithDeleteConfirm extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);

    this._button = document.querySelector(".popup__button-confirm");
  }

  open(onConfirm) {
    this._onConfirm = onConfirm;
    super.open();
  }

  setEventListeners() {
    this._button.addEventListener("click", (e) => {
      e.preventDefault();
      this._onConfirm();
    });
    super.setEventListeners();
  }
}
