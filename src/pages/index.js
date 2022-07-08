import "./index.css";

//Import all classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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
  avatarEdit,
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

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);
cardPreviewPopup.setEventListeners();
const editProfileFormPopup = new PopupWithForm({
  popupSelector: selectors.profileForm,
  handleFormSubmit: () => {
    renderLoading(true, "profile");
    api
      .setUserInfo({
        name: nameInputField.value,
        about: descriptionInputField.value,
      })
      .then(() => {
        currentUserInfo.setUserInfo({
          ...currentUserInfo.getUserInfo(),
          userName: nameInputField.value,
          userDescription: descriptionInputField.value,
        });

        hideModal(editProfileModal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, "profile");
      });
  },
});
editProfileFormPopup.setEventListeners();
const popupWithDeleteConfirm = new PopupWithDeleteConfirm({
  popupSelector: selectors.confirmDeleteForm,
});
popupWithDeleteConfirm.setEventListeners();
api
  .getUserInfo()

  .then((user) => {
    currentUserInfo.setUserInfo({
      userName: user.name,
      userDescription: user.about,
      userId: user._id,
      userAvatar: user.avatar,
    });
    api
      .getCardList()
      .then((cards) => {
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
                popupWithDeleteConfirm.open(() => {
                  renderLoading(true, "delete");
                  api
                    .removeCard(card.getId())
                    .then((res) => {
                      card.handleDelete();
                      hideModal(confirmDeleteModal);
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                    .finally(() => {
                      renderLoading(false, "delete");
                    });
                });
              },
              handleLikeClick: () => {
                api
                  .toggleLike(card.getId(), card.isLiked())
                  .then((res) => {
                    card.setLikes(res);
                  })
                  .catch((err) => {
                    console.log(err);
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
            renderLoading(true, "card");
            const newData = { name: data.title, link: data.url };
            api
              .addCard(newData)
              .then((newData) => {
                renderCard(newData);

                const button = addCardModal.querySelector(".popup__button");
                addFormValidator.disableSubmitButton(button);
                createPlaceFormPopup.close();
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                renderLoading(false, "card");
              });
          },
        });
        createPlaceFormPopup.setEventListeners();
        addButton.addEventListener("click", () => {
          showModal(addCardModal);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
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

editButton.addEventListener("click", () => {
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
  handleFormSubmit: (avatar) => {
    renderLoading(true, "avatar");
    api
      .setUserAvatar({ avatar: avatar.url })
      .then((result) => {
        currentUserInfo.setUserAvatar(avatar.url);
        currentUserInfo.setUserInfo({
          ...currentUserInfo.getUserInfo(),
          userAvatar: avatar.url,
        });

        const button = avatarPopup.querySelector(".popup__button");
        editAvatarFormValidator.disableSubmitButton(button);

        editAvatarFormPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, "avatar");
      });
  },
});
editAvatarFormPopup.setEventListeners();
avatarEdit.addEventListener("click", () => {
  showModal(avatarPopup);
});

function renderLoading(isLoading, popupId) {
  const currentButton = document.querySelector(`.popup__button-${popupId}`);
  if (isLoading) {
    currentButton.textContent = "Saving...";
  } else {
    currentButton.textContent = "Save";
  }
}

addFormValidator.enableValidation();
editFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();
