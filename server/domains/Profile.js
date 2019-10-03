class Profile {
  constructor(payload) {
    this.title = payload.Title;
    this.firstName = payload.GivenName;
    this.lastName = payload.FamilyName;
    this.dob = payload.dateOfBirth;
    this.dietaryPreferences = payload.dietaryPreferences;
    this.nickname = payload.nickname;
    this.gender = payload.gender;
    this.fullName = this.derivedFullName;
  }

  get derivedFullName() {
    return `${this.title} ${this.firstName} ${this.lastName}`;
  }
}

module.exports = Profile;
