import "./index.css";

//Import all classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/api.js";
import PopupWithDeleteConfirm from "../components/PopupWithDeleteConfirm.js";
import {
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

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "5e1a879b-7c30-44d6-a00c-43c3c87d943a",
});

const currentUserInfo = new UserInfo({
  userNameElement: userNameElement,
  userDescriptionElement: userDescriptionElement,
});

api.getUserInfo().then((userData) => {
  currentUserInfo.setUserInfo({
    userName: userData.name,
    userDescription: userData.about,
    userId: userData._id,
  });
});

// api.removeCard("62c46b4d749ed107931a49b8").then((res) => console.log(res));

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
    const name = nameInputField.value;
    api.setUserInfo({
      name: nameInputField.value,
      about: descriptionInputField.value,
    });
    hideModal(editProfileModal);
  },
});
const popupWithDeleteConfirm = new PopupWithDeleteConfirm({
  popupSelector: ".popup__delete",
  handleDeleteClick: (card) => {
    console.log("TEST");
    card.handleDelete();
  },
});

// function renderCard(data) {
//   const card = new Card(
//     {
//       data,
//       handleImageClick: (imgData) => {
//         cardPreviewPopup.open(imgData);
//       },
//     },
//     selectors.cardTemplate
//   );
//   cardSection.addItem(card.generateCard());
// }

api.getCardList().then((cards) => {
  const cardSection = new Section(
    {
      items: cards,
      renderer: renderCard,
    },
    selectors.cardSection
  );
  function renderCard(data) {
    const card = new Card(
      {
        data,
        handleImageClick: (imgData) => {
          cardPreviewPopup.open(imgData);
        },
        handleDeleteCardClick: (evt) => {
          const id = card.getId();
          console.log(api.removeCard(card.getId()));
          console.log(card.getId());
          popupWithDeleteConfirm.setEventListeners();
          // api.removeCard(id).then((res) => {
          //   card.handleDelete();
          // });
        },
        handleLikeClick: (LikeButtonIsActive, cardId, likeCounter) => {
          console.log(cardId);
          api.updateLike(LikeButtonIsActive, cardId).then((result) => {
            // likeCounter.textContent = result.likes.length;
            console.log(result);
          });
        },
      },
      selectors.cardTemplate
    );
    cardSection.addItem(card.generateCard());
  }
  cardSection.renderItems();
  const createPlaceFormPopup = new PopupWithForm({
    popupSelector: selectors.placeForm,
    handleFormSubmit: (data) => {
      const newData = { name: data.title, link: data.url };
      api.addCard(newData).then((newData) => {
        renderCard(newData);
        console.log(newData);
        console.log(newData._id);
        const button = addCardModal.querySelector(".popup__button");
        addFormValidator.disableSubmitButton(button);
        createPlaceFormPopup.close();
      });
    },
  });
  addButton.addEventListener("click", () => {
    createPlaceFormPopup.setEventListeners();
    showModal(addCardModal);
  });
});

// const createPlaceFormPopup = new PopupWithForm({
//   popupSelector: selectors.placeForm,
//   handleFormSubmit: (data) => {
//     const newData = { name: data.title, link: data.url };
//     renderCard(newData);
//     const button = addCardModal.querySelector(".popup__button");
//     addFormValidator.disableSubmitButton(button);
//     createPlaceFormPopup.close();
//   },
// });

const addFormValidator = new FormValidator(
  formValidationConfig,
  createPlaceForm
);
const editFormValidator = new FormValidator(
  formValidationConfig,
  editProfileForm
);

//Initialize all classes
// cardSection.renderItems();
cardPreviewPopup.setEventListeners();

addFormValidator.enableValidation();
editFormValidator.enableValidation();

//All the rest
editButton.addEventListener("click", () => {
  editProfileFormPopup.setEventListeners();
  showModal(editProfileModal);
  fillProfileForm();
});

function fillProfileForm() {
  const userInfo = currentUserInfo.getUserInfo();
  inputName.value = userInfo.userName;
  inputDescription.value = userInfo.userDescription;
}

// addButton.addEventListener("click", () => {
//   createPlaceFormPopup.setEventListeners();
//   showModal(addCardModal);
// });
