import "../src/pages/index.css";

//Import all classes
import FormValidator from "./scripts/FormValidator.js";
import Card from "./scripts/Card.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import UserInfo from "./scripts/UserInfo.js";

import {
  initialCards,
  selectors,
  formValidationConfig,
  editProfileForm,
  createPlaceForm,
  editButton,
  editProfileModal,
  nameInputField,
  descriptionInputField,
  addButton,
  addCardModal,
  userNameSelector,
  userDescriptionSelector,
  inputName,
  inputDescription,
} from "./scripts/constants.js";
import {
  showModal,
  hideModal,
  isEscUp,
  checkEscEvent,
} from "./scripts/utils.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import { data } from "autoprefixer";

//Export all classes

//Create instances of all classes
const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);
const editProfileFormPopup = new PopupWithForm({
  popupSelector: selectors.profileForm,
  handleFormSubmit: () => {
    currentUserInfo.setUserInfo({
      userName: nameInputField.value,
      userDescription: descriptionInputField.value,
    });

    hideModal(editProfileModal);
  },
});

const cardSection = new Section(
  {
    renderer: (data) => {
      const cardElement = new Card(
        {
          data,
          handleImageClick: (imgData) => {
            cardPreviewPopup.open(imgData);
          },
        },
        selectors.cardTemplate
      );
      const cards = cardElement.generateCard();

      cardSection.addItem(cards);
    },
  },
  selectors.cardSection
);

const createPlaceFormPopup = new PopupWithForm({
  popupSelector: selectors.placeForm,
  handleFormSubmit: (data) => {
    const newData = { name: data.title, link: data.url };

    const cardData = [];
    cardData.push(newData);
    cardSection.renderItems(cardData);
    const button = addCardModal.querySelector(".popup__button");
    addFormValidator.disableSubmitButton(button);
    createPlaceFormPopup.close();
  },
});

const addFormValidator = new FormValidator(
  formValidationConfig,
  createPlaceForm
);
const editFormValidator = new FormValidator(
  formValidationConfig,
  editProfileForm
);

//Initialize all classes
cardSection.renderItems(initialCards);
cardPreviewPopup.setEventListeners();

addFormValidator.enableValidation();
editFormValidator.enableValidation();

//All the rest
editButton.addEventListener("click", () => {
  editProfileFormPopup.setEventListeners();
  showModal(editProfileModal);
  fillProfileForm();
});

const currentUserInfo = new UserInfo({
  userNameSelector: userNameSelector,
  userDescriptionSelector: userDescriptionSelector,
});

function fillProfileForm() {
  const userInfo = currentUserInfo.getUserInfo();
  inputName.value = userInfo.userName;
  inputDescription.value = userInfo.userDescription;
}

addButton.addEventListener("click", () => {
  createPlaceFormPopup.setEventListeners();
  showModal(addCardModal);
});
