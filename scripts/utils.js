export const imageModal = document.querySelector("#image-popup");
export const modalImageElement = imageModal.querySelector(".popup__image");
export const modalCaption = imageModal.querySelector(".popup__caption");

export function showModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keyup", isEscUp);
}

export function hideModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keyup", isEscUp);
}

export function isEscUp(evt) {
  evt.preventDefault();
  checkEscEvent(evt, hideModal);
}

export function checkEscEvent(evt, action) {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    action(activePopup);
  }
}
