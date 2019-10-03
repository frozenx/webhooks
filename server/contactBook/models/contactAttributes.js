const constants = require('../../constants');

class ContactAttributes {

    getRequiredBodyAttr(body) {
      //console.log("attr",body.contact)
    const contact = body.attributes;
      return{
        contactUuid:Math.floor(Math.random()*Math.pow(10,15)),
        //"inactiveDate":"2019-07-01T05:17:33.472Z", //body.attributes['inactiveDate'],
        partnerHeaderUuid: body.partnerUuid,
        //"status":body.attributes['contactStatus'],
        title: contact.title,
        firstName: contact.firstName,
        middleName: contact.middleName,
        lastName: contact.lastName,
        jobTitle: contact.jobTitle,
        emailAddress: contact.emailAddress,
        alternativeContactName: contact.alternativeContactName,
        inactiveDate:contact.inactiveDate,
        contactStatus: contact.contactStatus,
        preferredContactMethod: contact.preferredContactMethod,
        preferredDeliveryMethod: contact.preferredDeliveryMethod,
        phoneCountryCode: contact.phoneCountryCode,
        phoneAreaCode: contact.phoneAreaCode,
        phoneNumber: contact.phoneNumber,
        phoneExtension: contact.phoneExtension,
        faxCountryCode: contact.faxCountryCode,
        faxAreaCode: contact.faxAreaCode,
        faxNumber: contact.faxNumber,
        mobileCountryCode:contact.mobileCountryCode,
        mobileNumber: contact.mobileNumber,
        mobileAreaCode: contact.mobileAreaCode,
        addressLink: contact.addressLink,
       createOracleUserAccount: contact.createOracleUserAccount,
        oracleRoles: contact.oracleRoles,
        oracleAccountInactiveDate:contact.oracleAccountInactiveDate,
        oracleAccountStatus: contact.oracleAccountStatus

      }
    }    
  }

module.exports = ContactAttributes;
