const Suppliers = require('../../models/Suppliers');
const mockData = require('../mockData');

describe('Supplier Model should invoked', () => {
  let mockSuppliersModelInstance;
  const mockPayload = mockData.supplierMockData;

  beforeEach(() => {
    mockSuppliersModelInstance = new Suppliers(mockPayload.suppliers);
  });

  test('should call the constructor method of Supplier Model', () => {
    expect(mockSuppliersModelInstance.suppliers).toEqual(mockPayload.suppliers);
  });
});
