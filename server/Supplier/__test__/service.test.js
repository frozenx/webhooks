jest.mock('winston');
jest.mock('../../clients/httpClient');
const httpClient = require('../../clients/httpClient');
const SupplierService = require('../service');
const mockData = require('./mockData');

describe('Supplier Model should invoked', () => {
  const mockAccessToken = 'random accessToken';
  let mockSupplierServiceInstance;
  const mockErrorMessage = 'Random Error Message';
  const mockError = {
    message: mockErrorMessage
  };

  const mockResponse = mockData.supplierMockData;
  const mockParams = {
    supplierName: 'some value',
  };
  const expectedMockResponse = mockData.expectedSupplierMockData;
  

  beforeEach(() => {
    mockSupplierServiceInstance = new SupplierService(mockAccessToken);
  });

  test('should call the constructor of Supplier Service', () => {
    expect(httpClient).toHaveBeenCalledWith(mockAccessToken);
    const mockHttpClientInstance = httpClient.mock.instances[0];
    expect(mockSupplierServiceInstance.accessToken).toBe(mockAccessToken);
    expect(mockSupplierServiceInstance.httpClient).toBe(mockHttpClientInstance);
  });

  test('should call the httpClient post method with success', async () => {
    mockSupplierServiceInstance.httpClient.post.mockResolvedValue(mockResponse);
    const actualResponse = await mockSupplierServiceInstance.readSupplier(mockParams);
    expect(mockSupplierServiceInstance.httpClient.post).toHaveBeenCalled();
    setTimeout(() => {
      expect(actualResponse).toEqual(expectedMockResponse);
    }, 0);
  });

  test('should call the httpClient post method with success and calling supplier name', async () => {
    mockSupplierServiceInstance.httpClient.post.mockResolvedValue(mockResponse);
    const params = {};
    const actualResponse = await mockSupplierServiceInstance.readSupplier(params);
    expect(mockSupplierServiceInstance.httpClient.post).toHaveBeenCalled();
    setTimeout(() => {
      expect(actualResponse).toEqual(expectedMockResponse);
    }, 0);
  });
  
  test('should call the httpClient and throw error', async () => {
    mockSupplierServiceInstance.httpClient.post.mockRejectedValue(mockError);
    try{
       await mockSupplierServiceInstance.readSupplier(mockParams);
    }catch(error){
      expect(mockSupplierServiceInstance.httpClient.post).toHaveBeenCalled();
      expect(error).toEqual(mockError);
    }
  });
});
