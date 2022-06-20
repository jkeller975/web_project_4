export const initialCards = [
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

export const selectors = {
  cardSection: ".elements__list",
  cardTemplate: "#card-template",
  previewPopup: "#image-popup",
  profileForm: "#edit-profile-popup",
  placeForm: "#add-card-popup",
};

export const formValidationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visable",
};

export const editProfileForm = document.querySelector(
  ".popup__form_type_profile"
);
export const createPlaceForm = document.querySelector(
  ".popup__form_type_place"
);
export const editButton = document.querySelector(".profile__edit-button");
export const editProfileModal = document.querySelector("#edit-profile-popup");

export const nameInputField = editProfileForm.querySelector(
  ".popup__input_type_name"
);
export const descriptionInputField = editProfileForm.querySelector(
  ".popup__input_type_description"
);

export const addButton = document.querySelector(".profile__add");
export const addCardModal = document.querySelector("#add-card-popup");

export const userNameSelector = document.querySelector(".profile__name");
export const userDescriptionSelector = document.querySelector(
  ".profile__description"
);
export const inputName = document.querySelector(".popup__input_type_name");
export const inputDescription = document.querySelector(
  ".popup__input_type_description"
);
