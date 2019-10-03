jest.mock('../../clients/httpClient');
jest.mock('../../lib/error-handlers/ErrorBuilder');
const ContactService = require('../service');
const ErrorBuilder = require('../../lib/error-handlers/ErrorBuilder');
const HttpClient = require('../../clients/httpClient');


describe('contactBook/service', () => {
    describe('getPartnerContacts', () => {
        let uuids = ['1', '2'],
            contactService,
            accessToken = 'some access token',
            contactServiceResponse = 'some response';
        beforeEach(() => {

            contactService = new ContactService(accessToken);
            contactService.httpClient.get.mockResolvedValue(contactServiceResponse);
            contactService.getPartnerContacts(uuids);
        });
        
      
        test('should call contact service api for every uuid', () => {
            expect(contactService.httpClient.get).toHaveBeenCalled;

        });
    });
    describe('saveContact',()=>{
        let contactUrl="some url",data="some data",saveContactCustomHeaders="custom headers",accessToken="token",
        contactServiceSaveResponse="res"
        beforeEach(()=>{

            contactService = new ContactService(accessToken);
            contactService.httpClient.get.mockResolvedValue(contactServiceSaveResponse);
            contactService.saveContact(contactUrl,data,saveContactCustomHeaders);


        });
        test('should call contact service api to save contact', () => {
            expect(contactService.httpClient.post).toHaveBeenCalled;

        });

    });
    describe('getContacts error', () => {
        let uuids = ['1', '2'],
            contactService,
            accessToken = 'some access token',
            contactErrorResponse = 'some error response',
            clientToken = 'some client token',
            errorCode = 'some code',
            errorMessage = 'some message';
        beforeEach(() => {

            contactService = new ContactService(accessToken);
            contactService.httpClient.get.mockRejectedValue(contactErrorResponse);
            ErrorBuilder.mockImplementation(() => ({ message: errorMessage, code: errorCode }));

        });

        test('should throw error builder object', async (done) => {
            try {
                await contactService.getPartnerContacts(uuids);

            } catch (err) {
                expect(ErrorBuilder).toHaveBeenCalledWith('service', contactErrorResponse);
                done();
            }
        });
    });
});