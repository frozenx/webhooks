class PaymentDetails {
  constructor(payload) {
    this.paymentDetails = PaymentDetails.constructData(payload);
  }

  static constructData(data) {
    try {
      const attributeGroupsData = data.tncAttributes.map(tncAttribute => ({
        name: tncAttribute.attributeGroup,
      }));

      const indicatorData = data.tncAttributes.map(tncAttribute => ({
        [tncAttribute.attributeGroup]: {
          value: 10,
          variant: 'error',
        },
      }));

      const selectedPaymentName = data.tncAttributes[0].attributes.find(
        attribute => attribute.name === 'paymentTermsName',
      ).values[0].value;
      return {
        attributeGroups: attributeGroupsData,
        indicators: Object.assign({}, indicatorData),
        uuid: data.uuid,
        version: data.version,
        selectedPaymentName,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PaymentDetails;
