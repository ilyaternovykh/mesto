export class UserInfo {
  constructor(userInfoName, userInfoAbout, userAvatar) {
    this._name = userInfoName;
    this._about = userInfoAbout;
    this._avatar = userAvatar;
    // this._api = api;
  }

  getUserInfo() {
    this._user = {
      name: this._name.textContent,
      about: this._about.textContent
    }

    return this._user;
  }

  // saveUserInfo = (data) => {
  //   this._api
  //     .editUserInfo({name: data.profile__name, about: data.profile__about})
  //     .then((userData) => this.setUserInfo(userData))
  //     .catch((err) => console.log(err));
  // }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
