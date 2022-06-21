import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputValues = {};
    this._inputList = [...this._popupForm.querySelectorAll(".popup__input")];
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this.handleFormSubmit);
  }

  handleFormSubmit = (e) => {
    const newInput = this._handleFormSubmit(this._getInputValues());

    return newInput;
  };

  close() {
    this._popupForm.reset();
    super.close();
  }
}
