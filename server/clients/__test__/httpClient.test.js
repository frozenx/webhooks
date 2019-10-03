jest.mock('../../lib/error-handlers/ErrorBuilder');

const axios = require('axios');
const HttpClient = require('../httpClient');
const ErrorBuilder = require('../../lib/error-handlers/ErrorBuilder');
const HttpError = require('../../lib/error-handlers/HttpError');

jest.mock('axios');

describe('clients/httpClient', () => {
  let httpClient = {};
  const accessToken = 'some accessToken';
  const url = 'some url';
  const data = { key: 'value' };
  const params = { param1: 'value1' };
  httpClient = new HttpClient(accessToken);
  const mockPromiseReturnValue = { data: 'some value' };
  const mockPromiseRejectedValue = {
    message: 'some error',
    status: 500
  }
  test('should instantiate the constructor', () => {
    expect(httpClient).toBeInstanceOf(HttpClient);
    expect(httpClient.accessToken).toEqual('Bearer ' + accessToken);
  });
  test('should expose get method', async () => {
    axios.mockImplementation().mockReturnValue(Promise.resolve(mockPromiseReturnValue));
    const promise = await httpClient.get(url, {}, params);
    expect(axios).toBeCalled();
    expect(axios).toBeCalledWith({ url, params, headers: { Authorization: 'Bearer some accessToken' } });
    expect(promise).toEqual(mockPromiseReturnValue.data);
  });
  test('should expose post method', async () => {
    axios.mockImplementation().mockReturnValue(Promise.resolve(mockPromiseReturnValue));
    const promise = await httpClient.post(url, data);
    expect(axios).toBeCalled();
    expect(axios).toBeCalledWith({
      url, data, method: 'post', headers: { Authorization: 'Bearer some accessToken' },
    });
    expect(promise).toEqual(mockPromiseReturnValue.data);
  });
  test('should expose put method', async () => {
    axios.mockImplementation().mockReturnValue(Promise.resolve(mockPromiseReturnValue));
    const promise = await httpClient.put(url, data);
    expect(axios).toBeCalled();
    expect(axios).toBeCalledWith({
      url, data, method: 'put', headers: { Authorization: 'Bearer some accessToken' },
    });
    expect(promise).toEqual(mockPromiseReturnValue.data);
  });
  test('should reject the put method', async (done) => {
    axios.mockImplementation().mockRejectedValue(mockPromiseRejectedValue);
    httpClient.put(url, data).then(done).catch((err) => {

      expect(err).toBeInstanceOf(ErrorBuilder);
      expect(ErrorBuilder).toHaveBeenCalledWith('http', mockPromiseRejectedValue);
      done();
    });
  });
  test('should reject the get method', async (done) => {
    axios.mockImplementation().mockReturnValue(Promise.reject(mockPromiseRejectedValue));
    httpClient.get(url, {}, params).then(done).catch((err) => {
      expect(err).toBeInstanceOf(ErrorBuilder);
      expect(ErrorBuilder).toHaveBeenCalledWith('http', mockPromiseRejectedValue);

      done();
    });

  });
  test('should reject the post method', async (done) => {
    axios.mockImplementation().mockRejectedValue(mockPromiseRejectedValue);
    httpClient.post(url, data).then(done).catch((err) => {

      expect(err).toBeInstanceOf(ErrorBuilder);
      expect(ErrorBuilder).toHaveBeenCalledWith('http', mockPromiseRejectedValue);
      done();
    });

  });
  test('should call get method without passing CustomHeaders and params', async () => {
    axios.mockImplementation().mockReturnValue(Promise.resolve(mockPromiseReturnValue));
    const promise = await httpClient.get(url);
    expect(promise).toEqual(mockPromiseReturnValue.data);
  });
});
