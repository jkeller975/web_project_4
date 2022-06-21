import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__image");
    this._imageCaption = this._popupElement.querySelector(".popup__caption");
  }
  open({ link, name }) {
    this._imageCaption.textContent = name;
    this._imageElement.src = link;
    this._imageElement.alt = name;
    super.open();
  }
}
