class SiteDetails {
  constructor(payload) {
    this.siteDetails = SiteDetails.constructData(payload);
  }

  static constructData(data) {
    try {
      const attributeGroupsData = data.siteAttributes.map(siteAttribute => ({
        name: siteAttribute.attributeGroup,
      }));

      const indicatorData = data.siteAttributes.map(siteAttribute => ({
        [siteAttribute.attributeGroup]: {
          value: 10,
          variant: 'error',
        },
      }));

      const selectedSiteName = data.siteAttributes[0].attributes.find(
        attribute => attribute.name === 'siteName',
      ).values[0].value;

      return {
        attributeGroups: attributeGroupsData,
        indicators: Object.assign({}, indicatorData),
        uuid: data.uuid,
        version: data.version,
        selectedSiteName,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SiteDetails;
