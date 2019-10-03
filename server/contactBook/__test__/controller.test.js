jest.mock('../service');
jest.mock('../../lib/error-handlers/ErrorBuilder');
const ContactController = require('../controller');

const ErrorBuilder = require('../../lib/error-handlers/ErrorBuilder');
const ContactService = require('../service');



describe('contactBook/controller', () => {
    let pageNumber = 1,
        partnerUuid = 'some uuid';
    let contactController;
    let req = {
        cookies: {
            'OAuth.AccessToken.EP': 'some token'
        },
        query: {
            pageNumber,
            partnerUuid
        }
    };
    let res = {
        json: jest.fn(),
        status: jest.fn(),
        end: jest.fn()
    };
    let partnerContactServiceResponse = {
        data: 'some data'
    };
  

    describe('getContacts', () => {

       
        beforeEach(() => {

            contactController = new ContactController(req, res);
           contactController.contactService.getPartnerContacts.mockResolvedValue(partnerContactServiceResponse);
            contactController.getContacts();
        });
        test('should call getPartnerContact service', () => {
            const contactServiceInstance = ContactService.mock.instances[0];
            expect(contactServiceInstance.getPartnerContacts).toHaveBeenCalledWith(pageNumber, partnerUuid);
        });
      
      
       
    });
    describe('save contacts',()=>{
        let body="body",reqAttr="attr",isPatchOperation=true;
        beforeEach(()=>{
            contactController=new ContactController(req,res);
            contactController.contactService.saveContact.mockResolvedValue(partnerContactServiceResponse);
            contactController.saveContact(body, reqAttr,isPatchOperation);
        })
        test('should call saveContact service', () => {
            const contactServiceInstance = ContactService.mock.instances[0];
            expect(contactServiceInstance.saveContact).toHaveBeenCalled
        });
    })
    describe('getContacts error', () => {
        let partnerContactServiceError = {
            error: 'some errror'
        },
            errorMessage = 'some error message',
            errorCode = 'some code';
        beforeAll(() => {
            res.status.mockClear();
            res.end.mockClear();
            ErrorBuilder.mockClear();
        });
        beforeEach(() => {
            contactController = new ContactController(req, res);
            contactController.contactService.
                getPartnerContacts.
                mockRejectedValue(partnerContactServiceError);
            ErrorBuilder.mockImplementation(() => ({ message: errorMessage, code: errorCode }));
            contactController.getContacts();
        });
        test('should log the error and return error response', () => {
            expect(ErrorBuilder).toHaveBeenCalledWith('controller', partnerContactServiceError);
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(res.end).toHaveBeenCalled();
        });
    });
});