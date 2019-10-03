const Supplier = require('../../models/Supplier');
const mockData = require('../mockData');

describe('Supplier Model should invoked', () => {
  let mockSupplierModelInstance;
  const mockPayload = mockData.supplierMockData;
  beforeEach(() => {
    mockSupplierModelInstance = new Supplier(mockPayload.suppliers[0]);
  });

  test('should call the constructor method of Supplier Model', () => {
    expect(mockSupplierModelInstance.supplierName).toBe(mockPayload.suppliers[0].partnerName);
    expect(mockSupplierModelInstance.companiesHouseName)
      .toBe(mockPayload.suppliers[0].companiesHouseName);
    expect(mockSupplierModelInstance.companyRegistrationNumber)
      .toBe(mockPayload.suppliers[0].partnerNumber);
    expect(mockSupplierModelInstance.vatNumber).toBe(mockPayload.suppliers[0].vatNumber);
  });
});
