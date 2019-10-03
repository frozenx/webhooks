class UAMModel {
  constructor(payload) {
    this.currentIndex = -1;
    this.resources = this.extractResources(payload);
  }

  resolveAccessList(resources, object = {}, actions) {
    try {
      return resources.reduce((result, string) => {
        const actualResult = result;
        const [key, value] = string.split(/\|(.+)/);
        if (value && value.includes('|')) {
          actualResult[key] = result[key] || {};
          this.resolveAccessList([value], result[key], actions);
        } else {
          actualResult[key] = result[key] || [];
          this.currentIndex = this.currentIndex + 1;
          result[key].push({ [value]: actions[this.currentIndex] });
        }
        return result;
      }, object);
    } catch (error) {
      throw error;
    }
  }

  extractResources(payload) {
    try {
      const eachPolicyResources = payload.claims.map(claim => claim.resources);
      const resources = [].concat(...eachPolicyResources);
      const actions = payload.claims.map(claim => claim.actions);
      return this.resolveAccessList(resources, {}, actions);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UAMModel;
