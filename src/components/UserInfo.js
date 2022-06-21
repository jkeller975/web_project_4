export default class UserInfo {
  constructor({ userNameElement, userDescriptionElement }) {
    this._userNameElement = userNameElement;
    this._userDescriptionElement = userDescriptionElement;
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo({ userName, userDescription }) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
  }
}
