const logger = require('../lib/logger');
const Constants = require('../constants/');


const getAction = (objectOfActions) => {
  const { CREATE, READ, UPDATE } = Constants.uamAccessKeyWords;
  const accessKeys = { create: false, read: false, update: false };
  const hasCreate = objectOfActions[CREATE];
  const hasUpdate = objectOfActions[UPDATE];
  const hasRead = hasCreate || hasUpdate || objectOfActions[READ];
  accessKeys.create = hasCreate;
  accessKeys.read = hasRead;
  accessKeys.update = hasUpdate;
  return accessKeys;
};

const arrayToObject = (accessKeys) => {
  return accessKeys.reduce((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, {});
};


const extractAccessForAttributeGrps = (access, entityType, attrGrpName) => {
  const accessKeys = access.resources.attributeGroup[entityType].find(
    attrGrpAccess => Object.keys(attrGrpAccess)[0] === attrGrpName,
  )[attrGrpName];
  const accessObject = arrayToObject(accessKeys);
  return getAction(accessObject);
};



const mergeMetaDataBasedOnUamAccess = (uam, metaData, entityType) => {
  const attrGrpRules = {};
  metaData.attributeGroups.forEach((attrGrp) => {
    attrGrpRules[attrGrp.key] = { create: true, read: true, update: true };
  });
  uam.resources.attributeGroup[entityType].forEach((attrGrp) => {
    const attrGrpName = Object.keys(attrGrp)[0];
    attrGrpRules[attrGrpName] = {
      ...extractAccessForAttributeGrps(uam, entityType, attrGrpName),
    };
  });
  const updateAttributeToRulesMapping = { ...metaData.attributeToRulesMapping, ...attrGrpRules };
  const updatedMetaData = { ...metaData, attributeToRulesMapping: updateAttributeToRulesMapping };
  let attributes = [];
  Object.keys(uam.resources.attribute[entityType]).forEach(attrGrp => attributes.push(
    uam.resources.attribute[entityType][attrGrp],
  ));
  attributes = [].concat.apply([], attributes);
  attributes = Object.assign({}, ...attributes)
  const updateAttrWithAccess = function (attributes){
    Object.keys(attributes).forEach(attrKey => {
      const accessObj = arrayToObject(attributes[attrKey])
      attributes[attrKey] = getAction(accessObj);
    })
    return attributes
  }

  const attributesWithAccess = updateAttrWithAccess(attributes);


  Object.keys(attributesWithAccess).forEach(attr => {
    if(attributesWithAccess[attr].read && (!attributesWithAccess[attr].create && !attributesWithAccess[attr].update )){
      attributesWithAccess[attr].required = false
    }
  })
 
  Object.keys(updatedMetaData.attributeToRulesMapping).forEach(attr => {
    updatedMetaData.attributeToRulesMapping[attr] = {
      create: true,
      read: true,
      update: true,
      ...updatedMetaData.attributeToRulesMapping[attr],
      ...attributesWithAccess[attr]
    }
  })

  return updatedMetaData;
};

const maskData = (charToBeShownFromStarting, charToBeShownFromEnding, objToBeMasked) => {
  const tempObjToBeMasked = { ...objToBeMasked };
  const tempKeys = Object.keys(tempObjToBeMasked);
  const tempArray = [];
  tempKeys.forEach((key) => {
    tempObjToBeMasked[key] = tempObjToBeMasked[key].replace(
      /((?:[a-z\d][-@.:]?){4})([-@:.a-z\d]+)((?:[a-z\d][-@.:]?){4})/ig,
      (_, g1, g2, g3) => g1 + g2.replace(/[a-z\d]/ig, '*') + g3,
    );
  });
  Object.keys(tempObjToBeMasked).forEach((key) => {
    tempArray.push(`${key} : ${tempObjToBeMasked[key]}`);
  });
  return tempArray.join(' || ');
};


const handleError = (responseData) => {
  try {
    const statusCode = responseData.response.status;
    switch (true) {
      case statusCode === 401: {
        const error = {
          message: Constants.INVALID_USER,
          status: statusCode,
        };
        // logger.error({
        //   message: {
        //     logMsg: error.message,
        //     statusCode: error.status,
        //   },
        // });
        // issue with logger need to replace console.log with logger in future
        console.log('Error occuring in UAM  since access list is giving Invalid user error', error);
        throw error;
      }
      case statusCode === 404: {
        const error = {
          message: Constants.DATA_NOT_AVAILABLE,
          status: statusCode,
        };
        // logger.error({
        //   message: {
        //     logMsg: error.message,
        //     statusCode: error.status,
        //   },
        // });
        // issue with logger need to replace console.log with logger in future
        console.log('Error occuring in UAM  since access list is giving Data not available', error);
        throw error;
      }
      case statusCode >= 500: {
        const error = {
          message: Constants.SERVICE_ERROR,
          status: statusCode,
        };
        // logger.error({
        //   logMsg: error.message,
        //   statusCode: error.status,
        // });
        // issue with logger need to replace console.log with logger in future
        console.log('Error occuring in UAM  since access list is giving Service not available', error);
        throw error;
      }
      default: {
        const error = {
          message: Constants.UNEXPECTED_ERROR,
        };
        // logger.error({
        //   message: {
        //     logMsg: error.message,
        //   },
        // });
        // issue with logger need to replace console.log with logger in future
        console.log('Error occuring in UAM  since access list is giving unexpected error', error);
        throw error;
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  maskData,
  handleError,
  extractAccessForAttributeGrps,
  mergeMetaDataBasedOnUamAccess,
  getAction,
  arrayToObject,
};
