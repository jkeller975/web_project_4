const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const placesWrap = document.content.querySelector(".elements__list");
const modalWindow = document.querySelector(".popup");
const editForm = document.querySelector(".popup__form");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = modalWindow.querySelector(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const nameInputField = editForm.querySelector(".popup__input_type_name");
const descriptionInputField = editForm.querySelector(
  ".popup__input_type_description"
);

function removeModalVisibility() {
  modalWindow.classList.remove("popup_opened");
}

function addModalVisibility() {
  modalWindow.classList.add("popup_opened");
  nameInputField.value = profileName.textContent;
  descriptionInputField.value = profileDescription.textContent;
}

function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  removeModalVisibility();
}

editForm.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", addModalVisibility);
closeButton.addEventListener("click", removeModalVisibility);

const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__item").src = `url("${data.link}")`;
  cardElement.querySelector(".card__text").textContent = data.name;
  return cardElement;
};

const renderCard = (data, wrapper) => {
  const newCard = getCardElement(data);
  wrapper.prepend(newCard);
};

initialCards.forEach((data) => {
  renderCard(data, placesWrap);
});
