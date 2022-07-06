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
  editAvatarForm,
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
  confirmDeleteModal,
  avatarPopup,
  avatar,
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

//Create instances of all classes
const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);
const editProfileFormPopup = new PopupWithForm({
  popupSelector: selectors.profileForm,
  handleFormSubmit: () => {
    currentUserInfo.setUserInfo({
      userName: nameInputField.value,
      userDescription: descriptionInputField.value,
    });

    api.setUserInfo({
      name: nameInputField.value,
      about: descriptionInputField.value,
    });
    hideModal(editProfileModal);
  },
});
api.getUserInfo().then((user) => {
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
          handleDeleteCardClick: (data) => {
            showModal(confirmDeleteModal);
            const popupWithDeleteConfirm = new PopupWithDeleteConfirm({
              popupSelector: selectors.confirmDeleteForm,
              handleClick: (evt) => {
                api.removeCard(card.getId()).then((res) => {
                  card.handleDelete();
                });
                hideModal(confirmDeleteModal);
              },
            });
            popupWithDeleteConfirm.setEventListeners();
          },
          handleLikeClick: (data) => {
            api.toggleLike(card.getId(), card.isLiked()).then((res) => {
              card.setLikes(res);
            });
          },
        },
        selectors.cardTemplate,
        user
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
});

const addFormValidator = new FormValidator(
  formValidationConfig,
  createPlaceForm
);
const editFormValidator = new FormValidator(
  formValidationConfig,
  editProfileForm
);
const editAvatarFormValidator = new FormValidator(
  formValidationConfig,
  editAvatarForm
);

//Initialize all classes
cardPreviewPopup.setEventListeners();

addFormValidator.enableValidation();
editFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

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

const editAvatarFormPopup = new PopupWithForm({
  popupSelector: selectors.avatarPopup,
  handleFormSubmit: (data) => {
    // api.setUserAvatar(newData).then((newData) => {
    //   renderCard(newData);

    const button = addCardModal.querySelector(".popup__button");
    editAvatarFormValidator.disableSubmitButton(button);
    console.log("TEST");
    editAvatarFormPopup.close();
    // });
  },
});

avatar.addEventListener("click", () => {
  editAvatarFormPopup.setEventListeners();
  showModal(avatarPopup);
});
