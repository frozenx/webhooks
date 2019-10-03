class Identity {
  constructor(payload) {
    this.uuid = payload.uuid;
    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
  }
}

module.exports = Identity;
