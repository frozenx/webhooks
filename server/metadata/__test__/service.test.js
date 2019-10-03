jest.mock('../../clients/httpClient');
const httpClient = require('../../clients/httpClient');
const MetaDataService = require('../service');
// const mockData = require('./mockData');

describe('Supplier Model should invoked', () => {
  const mockAccessToken = 'random accessToken';
  let metaDataService;
  const mockError = { error: 'random error' };
  const body = {
    uuid: '123',
    version: '1',
    status: 'DRAFT',
    name: 'test',
    siteUuid: '123444',
    siteVersion: 1,
    paymentUuid: '445677788',
    paymentVersion: 1,
  }
  //   const metaDataServiceData = mockData.getSupplierHeaderMock;
  //   const mockErrorMessage = 'Error Message';
  // const metaDataServiceData = mockData.getSupplierHeaderMock;
  //   const mockError = {
  //     message: mockErrorMessage,
  //   };
  beforeEach(() => {
    metaDataService = new MetaDataService(mockAccessToken);
  });

  test('should call the constructor of Supplier Service', () => {
    expect(httpClient).toHaveBeenCalledWith(mockAccessToken);
    const mockHttpClientInstance = httpClient.mock.instances[0];
    expect(metaDataService.accessToken).toBe(mockAccessToken);
    expect(metaDataService.httpClient).toBe(mockHttpClientInstance);
  });

  test('should call the httpClient get method with success for supplier header', () => {
    metaDataService.httpClient.get.mockResolvedValue({ data: 'Some data' });
    metaDataService.getSupplierHeader();
    expect(metaDataService.httpClient.get).toHaveBeenCalled();
  });

  test('should throw the error if httpClient throw error for supplier header', async (done) => {
    metaDataService.httpClient.get.mockRejectedValue(mockError);
    try {
      await metaDataService.getSupplierHeader();
    } catch (err) {
      expect(err).toEqual(mockError);
      done();
    }


  })

  test('should call the httpClient get method with success for supplier payments', () => {
    metaDataService.httpClient.get.mockResolvedValue({ data: 'Some data' });
    metaDataService.getSupplierPayments();
    expect(metaDataService.httpClient.get).toHaveBeenCalled();
  });

  test('should log the message if httpClient throw error for supplier payments', async (done) => {
    metaDataService.httpClient.get.mockRejectedValue(mockError);
    try {
      await metaDataService.getSupplierPayments();
    } catch (err) {
      expect(err).toEqual(mockError);
      done();
    }
  })

  test('should call the httpClient put method with success for createHeader', async () => {    
    metaDataService.httpClient.put.mockResolvedValue({ data: 'Some data' });
    await metaDataService.createHeader(body);
    expect(metaDataService.httpClient.put).toHaveBeenCalled();
  });

  test('should throw the error if httpClient throw error for createHeader', async (done) => {
    metaDataService.httpClient.put.mockRejectedValue(mockError);
    try {
      await metaDataService.createHeader(body);
    } catch (err) {
      expect(err).toEqual(mockError);
      done();
    }
  })

  test('should call the httpClient put method with success for createSite', async () => {
    const body = {
      siteCodeId: 1,
      status: 'SAVE'
    }      
    metaDataService.httpClient.put.mockResolvedValue({ data: 'Some data' });
    await metaDataService.createSite(body);
    expect(metaDataService.httpClient.put).toHaveBeenCalled();
  });

  test('should call the httpClient put method with success for updating a created site', async () => {        
    metaDataService.httpClient.put.mockResolvedValue({ data: 'Some data' });
    await metaDataService.createSite(body);
    expect(metaDataService.httpClient.put).toHaveBeenCalled();
  });
  

  test('should throw the error if httpClient throw error for createSite', async (done) => {
    metaDataService.httpClient.put.mockRejectedValue(mockError);
    try {
      await metaDataService.createSite(body);
    } catch (err) {
      expect(err).toEqual(mockError);
      done();
    }
  })

  test('should call the httpClient put method with success for createPayment', async () => {
    const body = {
      name: 'payment name',
      status: 'SAVE'
    }   
    metaDataService.httpClient.put.mockResolvedValue({ data: 'Some data' });
    await metaDataService.createPayment(body);
    expect(metaDataService.httpClient.put).toHaveBeenCalled();
  });

  test('should call the httpClient put method with success for updating a created Payment', async () => {    
    metaDataService.httpClient.put.mockResolvedValue({ data: 'Some data' });
    await metaDataService.createPayment(body);
    expect(metaDataService.httpClient.put).toHaveBeenCalled();
  });

  test('should throw the error if httpClient throw error for createPayment', async (done) => {
    metaDataService.httpClient.put.mockRejectedValue(mockError);
    try {
      await metaDataService.createPayment(body);
    } catch (err) {
      expect(err).toEqual(mockError);
      done();
    }
  })

  test('should call the httpClient get method with success for getting siteDetails', async () => {    
    metaDataService.httpClient.get.mockResolvedValue({ data: 'Some data' });
    await metaDataService.siteDetails(body);
    expect(metaDataService.httpClient.get).toHaveBeenCalled();
  });

  test('should throw the error if httpClient throw error for getting siteDetails', async (done) => {    
    metaDataService.httpClient.get.mockRejectedValue(mockError);
    try {
      await metaDataService.siteDetails(body);
    } catch (err) {
      expect(err).toEqual(mockError);
      done();
    }
  })

  test('should call the httpClient get method with success for getting paymentDetails', async () => {    
    metaDataService.httpClient.get.mockResolvedValue({ data: 'Some data' });
    await metaDataService.paymentDetails(body);
    expect(metaDataService.httpClient.get).toHaveBeenCalled();
  });

  test('should throw the error if httpClient throw error for getting paymentDetails', async (done) => {    
    metaDataService.httpClient.get.mockRejectedValue(mockError);
    try {
      await metaDataService.paymentDetails(body);
    } catch (err) {
      expect(err).toEqual(mockError);
      done();
    }
  })
});
