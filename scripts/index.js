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
