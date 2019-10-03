class ProfileModel {
  constructor(payload) {
    this.GivenName = payload.GivenName;
    this.FamilyName = payload.FamilyName;
  }
}

module.exports = ProfileModel;
