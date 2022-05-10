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
const imageModal = document.querySelector("#image-popup");
const editProfileForm = document.querySelector(".popup__form_type_profile");
const createPlaceForm = document.querySelector(".popup__form_type_place");
const modalImageElement = imageModal.querySelector(".popup__image");
const modalCaption = imageModal.querySelector(".popup__caption");
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

const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".elements__list");

function removeModalVisibility(modal) {
  modal.classList.remove("popup_opened");
}

function addModalVisibility(modal) {
  modal.classList.add("popup_opened");
  if (modal === editProfileModal) {
    nameInputField.value = profileName.textContent;
    descriptionInputField.value = profileDescription.textContent;
  }
}

function editProfileFormSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  removeModalVisibility(editProfileModal);
}

editProfileForm.addEventListener("submit", editProfileFormSubmitHandler);

function createPlaceFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    link: imageInputField.value,
    name: titleInputField.value,
  };
  renderCard(newCard);
  removeModalVisibility(addCardModal);
}

createPlaceForm.addEventListener("submit", createPlaceFormSubmitHandler);

editButton.addEventListener("click", () => {
  addModalVisibility(editProfileModal);
});
addButton.addEventListener("click", () => {
  addModalVisibility(addCardModal);
});
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", (event) => {
    const popup = closeButton.closest(".popup");
    removeModalVisibility(popup);
  });
});

function createCard(data) {
  const card = cardTemplate.content.querySelector(".card").cloneNode(true);
  const imageElement = card.querySelector(".card__item");
  const titleElement = card.querySelector(".card__text");
  const likeButton = card.querySelector(".card__like");
  const deleteButton = card.querySelector(".card__delete");
  imageElement.src = data.link;
  imageElement.alt = data.name;
  titleElement.textContent = data.name;

  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });

  deleteButton.addEventListener("click", (evt) => {
    evt.target.parentElement.remove();
  });

  imageElement.addEventListener("click", () => {
    modalImageElement.src = data.link;
    modalCaption.textContent = data.name;
    addModalVisibility(imageModal);
  });

  return card;
}

function addCardToPage(card) {
  cardList.prepend(card);
}

function renderCard(data) {
  addCardToPage(createCard(data));
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});
