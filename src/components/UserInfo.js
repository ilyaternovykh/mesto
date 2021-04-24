export class UserInfo {
  constructor(userInfoName, userInfoAbout) {
    this._name = userInfoName;
    this._about = userInfoAbout;
  }

  getUserInfo() {
    this._user = {
      name: this._name.textContent,
      about: this._about.textContent
    }

    return this._user;
  }

  setUserInfo(data) {
    this._name.textContent = data.profile__name;
    this._about.textContent = data.profile__about;
  }
}
