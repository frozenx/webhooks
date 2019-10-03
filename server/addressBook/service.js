const config = require('../config').get(process.env.APP_ENV);
const HttpClient = require('../clients/httpClient');
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');
const addressConfig = require('./address-config');
const secrets = require('../secrets');

function getAdditionalAddressHeaders(clientToken) {
  const traceId = Math.floor(Math.random() * (10 ** 9));
  return {
    Authorization: `Bearer ${clientToken}`,
    'content-type': 'application/json',
    'content-language': 'en-GB',
    traceId,
  };
}

class AddressService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.httpClient = new HttpClient(this.accessToken);
  }


  get customHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      Accept: 'application/json',
    };
  }

  get companyHouseApiCustomHeaders() {
    return {
      Authorization: `Basic ${secrets.companyHouseApiKey}`,
      Accept: 'application/json',
    };
  }

  getAddressBodyAttributes(body, res) {
    const partnerServicePayload = {};
    const addressServicePayload = {};
    partnerServicePayload.addressUuid = res.id;
    Object.keys(body.attributes).forEach((requestAttribute) => {
      if (addressConfig.addressServiceAttributes.indexOf(requestAttribute) === -1) {
        partnerServicePayload[requestAttribute] = body.attributes[requestAttribute];
        addressServicePayload[requestAttribute] = body.attributes[requestAttribute];
      }
    });
    partnerServicePayload.partnerHeaderUuid = body.partnerUuid;
    return {
      partnerServicePayload,
      addressServicePayload,
    };
  }

  async getAddresses(uuids) {
    try {
      const {
        address: addressEndpoint,
      } = config;
      const promiseList = [];
      const clientToken = await this.httpClient.getClientToken();
      const customHeaders = await getAdditionalAddressHeaders(clientToken);
      const url = `${addressEndpoint.baseUrl}${addressEndpoint.getAddress}`;
      uuids.forEach((uuid) => {
        promiseList.push(this.httpClient.get(url.replace('{addressId}', uuid), customHeaders));
      });
      const addressRecords = await Promise.all(promiseList);
      return addressRecords;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async getPartnerAddresses(pageNumber, partnerUuid) {
    try {
      const {
        tps: partnerEndpoint,
      } = config;
      const url = pageNumber == 'full' ? `${partnerEndpoint.baseUrl}${partnerEndpoint.getPartnerFullAddresses}`.replace('{id}', partnerUuid) : `${partnerEndpoint.baseUrl}${partnerEndpoint.getPartnerAddresses}`
        .replace('{id}', partnerUuid)
        .replace('{pageNumber}', pageNumber)
        .replace('{pageSize}', addressConfig.pageSize);
      const partnerAddressRecords = await this.httpClient.get(url, this.customHeaders);
      return partnerAddressRecords;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async saveAddress(body, data, isPatchOperation) {
    try {
      const url = config.address.baseUrl + config.address.getSaveAddress;
      const saveAddressUrl = config.tps.baseUrl + config.tps.address;
      const clientToken = await this.httpClient.getClientToken();
      const customHeaders = await getAdditionalAddressHeaders(clientToken);
      const saveAddressCustomHeaders = this.customHeaders;
      const res = await this.httpClient.post(url, data, customHeaders);
      const {
        partnerServicePayload,
        addressServicePayload,
      } = this.getAddressBodyAttributes(body, res);
      const addressResponse = isPatchOperation ?
        await this.httpClient.put(saveAddressUrl, partnerServicePayload, saveAddressCustomHeaders) :
        await this.httpClient.post(saveAddressUrl, partnerServicePayload, saveAddressCustomHeaders);
      return Object.assign({}, addressResponse, addressServicePayload); // temp fix. need to move to get call
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async getCompanyAddress(companyHouseNumber) {
    try {
      const url = config.companyHouse.baseUrl +
        config.companyHouse.getCompanyAddress.replace('{companyHouseNumber}', companyHouseNumber);
      const companyHouseResponse = await this.httpClient.get(url, this.companyHouseApiCustomHeaders);
      return companyHouseResponse;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      serviceError.isCompanyAddressError = true;
      throw serviceError;
    }
  }
}
module.exports = AddressService;