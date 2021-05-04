export class UserInfo {
  constructor(userInfoName, userInfoAbout, api) {
    this._name = userInfoName;
    this._about = userInfoAbout;
    this._api = api;
  }

  getUserInfo() {
    this._user = {
      name: this._name.textContent,
      about: this._about.textContent
    }

    return this._user;
  }

  saveUserInfo = (data) => {
    this._api
      .editUserInfo({name: data.profile__name, about: data.profile__about})
      .then((userData) => this._setUserInfo(userData))
      .catch((err) => console.log(err));
  }

  _setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }
}
