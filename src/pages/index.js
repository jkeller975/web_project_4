import "./index.css";

//Import all classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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
  userNameElement,
  userDescriptionElement,
  inputName,
  inputDescription,
} from "../utils/constants.js";
import { showModal, hideModal } from "../utils/utils.js";

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

function renderCard(data) {
  const card = new Card(
    {
      data,
      handleImageClick: (imgData) => {
        cardPreviewPopup.open(imgData);
      },
    },
    selectors.cardTemplate
  );
  cardSection.addItem(card.generateCard());
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  selectors.cardSection
);

const createPlaceFormPopup = new PopupWithForm({
  popupSelector: selectors.placeForm,
  handleFormSubmit: (data) => {
    const newData = { name: data.title, link: data.url };
    renderCard(newData);
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
cardSection.renderItems();
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
  userNameElement: userNameElement,
  userDescriptionElement: userDescriptionElement,
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
