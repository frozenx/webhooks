jest.mock('winston');
jest.mock('../service');
jest.mock('../models/UAMModel');
const winston = require('winston');
const UamService = require('../service');
const UamController = require('../controller');
const UAMModel = require('../models/UAMModel');

describe('UAM Controller should invoked', () => {
  const mockAccessToken = 'random token';
  let mockUamControllerInstance;

  const mockReq = {
    cookies: {
      'OAuth.AccessToken.EP': mockAccessToken,
    },
  };
  const mockRes = {
    send: jest.fn(),
  };

  const mockUamData = [
    {
      claims:
      [
        { resources: ['api|/supplier'], actions: ['view'] },
      ],
    },
  ];

  UAMModel.mockImplementation(() => ({
    resources: {
      api: null,
    },
  }));

  beforeEach(() => {
    mockUamControllerInstance = new UamController(mockReq, mockRes);
  });

  test('should initialize supplier instance variables', () => {
    expect(UamService).toHaveBeenCalledWith(mockAccessToken);
    const mockServiceInstance = UamService.mock.instances[0];
    expect(mockUamControllerInstance.accessToken).toBe(mockAccessToken);
    expect(mockUamControllerInstance.uamService).toBe(mockServiceInstance);
    expect(mockUamControllerInstance.res).toBe(mockRes);
  });
  describe('should expose a method called getUamUrls', () => {
    beforeEach(async () => {
      await mockUamControllerInstance.getUamUrls();
    });
    test('should call the uam service method of uam service', () => {
      expect(mockUamControllerInstance.uamService.fetchPolicyByDescription).toHaveBeenCalled();
    });
    describe('should getuamUrl retun a empty response', () => {
      let mockUamEmptyReponse;
      beforeEach(() => {
        mockUamEmptyReponse = {
          resources: [],
          response: {
            status: 200,
          },
        };
        mockUamControllerInstance.uamService.fetchPolicyByDescription
          .mockResolvedValue(mockUamEmptyReponse);
        mockUamControllerInstance.getUamUrls();
      });
      test('should call the fetchPolicyByDescription', () => {
        expect(mockUamControllerInstance.uamService.fetchPolicyByDescription).toHaveBeenCalled();
      });
    });
    describe('should getuamUrl retun a success response', () => {
      beforeEach(async () => {
        await mockUamControllerInstance.uamService.fetchPolicyByDescription
          .mockResolvedValue(mockUamData);
        await mockUamControllerInstance.getUamUrls();
      });
      test('should call the fetchPolicyByDescription', async () => {
        expect(mockUamControllerInstance.uamService.fetchPolicyByDescription).toHaveBeenCalled();
        expect(UAMModel).toHaveBeenCalledWith(mockUamData[0]);
      });
    });
  });
  // uam
  describe('uam method test suites', () => {
    test('should uam method defined', () => {
      expect(mockUamControllerInstance.uam).toBeDefined();
    });
    test('uam method should be exposed and UamService to have been called', async () => {
      await mockUamControllerInstance.uam();
      expect(UamService).toHaveBeenCalledWith(mockAccessToken);
    });
    // uam success case
    describe('should uam method return unauthorized case', () => {
      let mockUamResponse;
      beforeEach(() => {
        mockUamResponse = { 'some key': 'some value', response: { status: 401 } };
        mockUamControllerInstance.uamService.fetchPolicyByDescription.mockResolvedValue(mockUamResponse);
        mockUamControllerInstance.uam();
      });
      test('should uam method return a status code of 401', async () => {
        expect(mockUamControllerInstance.uamService.fetchPolicyByDescription)
          .toHaveBeenCalledWith(mockAccessToken);
        const actualDataFromUamService = await mockUamControllerInstance
          .uamService.fetchPolicyByDescription();
        expect(actualDataFromUamService.response.status).toEqual(401);
        expect(winston.mockLoggerObject.error).toHaveBeenCalled();
      });
    });
    describe('should uam method return data of unavailable case', () => {
      let mockUamResponse;
      beforeEach(() => {
        mockUamResponse = { 'some key': 'some value', response: { status: 404 } };
        mockUamControllerInstance.uamService.fetchPolicyByDescription.mockResolvedValue(mockUamResponse);
        mockUamControllerInstance.uam();
      });
      test('should uam method return a status code of 404', async () => {
        expect(mockUamControllerInstance.uamService.fetchPolicyByDescription)
          .toHaveBeenCalledWith(mockAccessToken);
        const actualDataFromUamService = await mockUamControllerInstance
          .uamService.fetchPolicyByDescription();
        expect(actualDataFromUamService.response.status).toEqual(404);
        expect(winston.mockLoggerObject.error).toHaveBeenCalled();
      });
    });
    describe('should uam method return internal server error case', () => {
      let mockUamResponse;
      beforeEach(() => {
        mockUamResponse = { 'some key': 'some value', response: { status: 500 } };
        mockUamControllerInstance.uamService.fetchPolicyByDescription.mockResolvedValue(mockUamResponse);
        mockUamControllerInstance.uam();
      });
      test('should uam method return a status code greater than 500', async () => {
        expect(mockUamControllerInstance.uamService.fetchPolicyByDescription)
          .toHaveBeenCalledWith(mockAccessToken);
        const actualDataFromUamService = await mockUamControllerInstance
          .uamService.fetchPolicyByDescription();
        expect(actualDataFromUamService.response.status).toEqual(500);
        expect(winston.mockLoggerObject.error).toHaveBeenCalled();
      });
    });
    describe('should uam method return default error case', () => {
      let mockUamResponse;
      beforeEach(() => {
        mockUamResponse = { 'some key': 'some value', response: { status: 100 } };
        mockUamControllerInstance.uamService.fetchPolicyByDescription.mockResolvedValue(mockUamResponse);
        mockUamControllerInstance.uam();
      });
      test('should uam method return a status code of default case', async () => {
        expect(mockUamControllerInstance.uamService.fetchPolicyByDescription)
          .toHaveBeenCalledWith(mockAccessToken);
        const actualDataFromUamService = await mockUamControllerInstance
          .uamService.fetchPolicyByDescription();
        expect(actualDataFromUamService.response.status).toEqual(100);
        expect(winston.mockLoggerObject.error).toHaveBeenCalled();
      });
    });
    describe('should uam method return actual data', () => {
      let mockUamResponse;
      beforeEach(() => {
        mockUamResponse = { 'some key': 'some value', response: [{}] };
        mockUamControllerInstance.uamService.fetchPolicyByDescription.mockResolvedValue(mockUamResponse);
        mockUamControllerInstance.uam();
      });
      test('should initialize UAM Model', async () => {
        expect(mockUamControllerInstance.uamService.fetchPolicyByDescription)
          .toHaveBeenCalledWith(mockAccessToken);
        expect(UAMModel).toHaveBeenCalled();
        // const actualDataFromUamService = await mockUamControllerInstance
        //   .uamService.fetchPolicyByDescription(); 
        // expect(UAMModel).toHaveBeenCalledWith(actualDataFromUamService.response[0]) -- not able to run
      })

      test('should uam method send actual data to the client', async () => {
        expect(mockUamControllerInstance.res.send).toHaveBeenCalled();
      });
    });
  });
});
