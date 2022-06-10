import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {
  showModal,
  hideModal,
  isEscUp,
  checkEscEvent,
  imageModal,
  modalImageElement,
  modalCaption,
} from "./utils.js";

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
];

const editProfileModal = document.querySelector("#edit-profile-popup");
const addCardModal = document.querySelector("#add-card-popup");

const editProfileForm = document.querySelector(".popup__form_type_profile");
const createPlaceForm = document.querySelector(".popup__form_type_place");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add");
const closeButtons = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const nameInputField = editProfileForm.querySelector(".popup__input_type_name");
const descriptionInputField = editProfileForm.querySelector(
  ".popup__input_type_description"
);

const imageInputField = addCardModal.querySelector(".popup__input_type_link");
const titleInputField = addCardModal.querySelector(".popup__input_type_title");

const cardList = document.querySelector(".elements__list");

function editProfileFormSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  hideModal(editProfileModal);
}

editProfileForm.addEventListener("submit", editProfileFormSubmitHandler);

function createPlaceFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    link: imageInputField.value,
    name: titleInputField.value,
  };
  renderCard(newCard);
  hideModal(addCardModal);
  createPlaceForm.reset();
}

createPlaceForm.addEventListener("submit", createPlaceFormSubmitHandler);

editButton.addEventListener("click", () => {
  showModal(editProfileModal);
  fillProfileForm();
});

function fillProfileForm() {
  nameInputField.value = profileName.textContent;
  descriptionInputField.value = profileDescription.textContent;
}

addButton.addEventListener("click", () => {
  showModal(addCardModal);
});
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", (event) => {
    const popup = closeButton.closest(".popup");
    hideModal(popup);
  });
});

editProfileModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    hideModal(editProfileModal);
  }
});

addCardModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    hideModal(addCardModal);
  }
});

imageModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    hideModal(imageModal);
  }
});

function addCardToPage(card) {
  cardList.prepend(card);
}

function renderCard(data) {
  const card = new Card(data, "#card-template").generateCard();
  addCardToPage(card);
}

initialCards.forEach((data) => {
  renderCard(data);
});

const formValidationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visable",
};

const addFormValidator = new FormValidator(
  formValidationConfig,
  createPlaceForm
);

addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidationConfig,
  editProfileForm
);
editFormValidator.enableValidation();
