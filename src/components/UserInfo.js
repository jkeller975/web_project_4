import { avatar } from "../utils/constants.js";

export default class UserInfo {
  constructor({ userNameElement, userDescriptionElement, userAvatar, userId }) {
    this._userNameElement = userNameElement;
    this._userDescriptionElement = userDescriptionElement;
    this._userAvatar = userAvatar;
    this.userId = userId;
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
      userAvatar: this._userAvatar,
      userId: this._userId,
    };
  }

  setUserInfo({ userName, userDescription, userId, userAvatar }) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
    this._userId = userId;
    avatar.src = userAvatar;
  }

  setUserAvatar(imageLink) {
    this._userAvatar = imageLink;
  }
}
