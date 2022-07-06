export const selectors = {
  cardSection: ".elements__list",
  cardTemplate: "#card-template",
  previewPopup: "#image-popup",
  profileForm: "#edit-profile-popup",
  placeForm: "#add-card-popup",
  confirmDeleteForm: "#delete-confirm-popup",
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

export const userNameElement = document.querySelector(".profile__name");
export const userDescriptionElement = document.querySelector(
  ".profile__description"
);
export const inputName = document.querySelector(".popup__input_type_name");
export const inputDescription = document.querySelector(
  ".popup__input_type_description"
);

export const confirmDeleteModal = document.querySelector(
  "#delete-confirm-popup"
);
