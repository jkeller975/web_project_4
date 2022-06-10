export function showModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keyup", isEscUp);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}

export function hideModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keyup", isEscUp);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
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

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close")
  ) {
    hideModal(evt.target);
  }
}
