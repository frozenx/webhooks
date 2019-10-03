// const mockMath = Object.create(global.Math);
// mockMath.random = () => 10;
// global.Math = mockMath;
const PaymentDetailsModel = require('../../models/PaymentDetails');
const mockData = require('../mockData');

describe('Given the PaymentDetails Model is instantiated', () => {
  test('it should initialize the instance variables', () => {
    const mockPayload = mockData.paymentDetailsMock;
    const model = new PaymentDetailsModel(mockPayload);
    const { expectedPaymentDetailsModel } = mockData;
    expect(model).toEqual(expectedPaymentDetailsModel);
  });
  test('should fail when the passed data structure is wrong', () => {
    const payments = mockData.mockDataWrongStructureForPayments;
    expect(() => {
      const model = new PaymentDetailsModel(payments);
    }).toThrow(TypeError);
  });
});