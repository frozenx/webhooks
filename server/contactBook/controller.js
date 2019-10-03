const ContactService = require('./service');
const ContactAttributes = require('./models/contactAttributes');
const logger = require('../lib/logger')(module);
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');


class ContactController {
  constructor(req, res) {
   
    this.accessToken = req.cookies['OAuth.AccessToken.EP'];
    this.contactService = new ContactService(this.accessToken);
    this.body = req.body;
    this.request = req;
    this.response = res;
  }

  async getContacts() {
    try {
       const { pageNumber, partnerUuid } = this.request.query;
       const partnerServiceContactResponse = await this.contactService.getPartnerContacts(pageNumber, partnerUuid);

      this.response.json(partnerServiceContactResponse);
    }
    catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.response.end();
    }
  }

  async saveContact() {
    try {
      const requiredBodyAttr = new ContactAttributes();

      const isPatchOperation = this.request.query.operation === 'patch';
      let reqAttr=requiredBodyAttr.getRequiredBodyAttr(this.body)
      if(isPatchOperation)
      {
        reqAttr.contactUuid=this.body.attributes.contactUuid;
        reqAttr.uuid=this.body.attributes.enterpriseServiceUUID;
      }

       const contactResponse = await this.contactService.saveContact(this.body, reqAttr,isPatchOperation); 
       this.response.send(JSON.stringify(contactResponse));

    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.response.end();
    }
  }
}

module.exports = ContactController;
