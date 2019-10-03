const _ = require('lodash');
const Constants = require('../../constants');

class AttributeAccess {
  constructor(payload) {
    this.uamAccess = payload.uamAccess || null;
    this.metaData = payload.transformedMetaData;
    this.entityType = payload.entityType;
    this.updatedMetaData = AttributeAccess.updateMetaDataBasedOnAccess(
      this.uamAccess,
      this.metaData,
      this.entityType,
    );
  }

  static getManifestAction(manifest) {
    const {
      manifestKeys: { Hidden, ReadOnly, Editable },
    } = Constants;
    switch (manifest) {
      case Hidden:
        return { read: false, create: false, update: false };
      case ReadOnly:
        return { read: true };
      case Editable:
        return { read: true, create: true, update: true };
      default:
        return { read: false, create: false, update: false }
    }
  }

  static getAction(objectOfActions) {
    const { CREATE, READ, UPDATE } = Constants.uamAccessKeyWords;
    const accessKeys = { create: false, read: false, update: false };
    const hasCreate = objectOfActions[CREATE];
    const hasUpdate = objectOfActions[UPDATE];
    const hasRead = hasCreate || hasUpdate || objectOfActions[READ];
    accessKeys.create = hasCreate;
    accessKeys.read = hasRead;
    accessKeys.update = hasUpdate;
    return accessKeys;
  }

  static arrayToObject(accessKeys) {
    return accessKeys.reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {});
  }


  static updateMetaDataBasedOnAccess(uamAccess, metaData, entityType) {
    if (uamAccess) {
      // attribute group level default access
      const defaultAttGrpAccess = metaData.attributeGroups.reduce(
        (result, attrGrp) => {
          result[attrGrp.key] = { read: true, create: true, update: true };
          return result;
        },
        {},
      );

      // attribute group level uam access
      const uamAttrGrpAccess = uamAccess.resources.attributeGroup[
        entityType
      ].reduce((result, uamAttrGrp) => {
        const accessAttrGrp = Object.keys(uamAttrGrp)[0];
        const transformedAccessKeys = AttributeAccess.arrayToObject(
          uamAttrGrp[accessAttrGrp],
        );
        result[accessAttrGrp] = AttributeAccess.getAction(
          transformedAccessKeys,
        );
        return result;
      }, {});

      // attribute level uam access

      const attributeRulesUamAccess = {};
      Object.keys(uamAccess.resources.attribute[entityType]).forEach(
        (attrGrp) => {
          uamAccess.resources.attribute[entityType][attrGrp].forEach((attr) => {
            const accessAttr = Object.keys(attr)[0];
            const transformedAccessKeys = AttributeAccess.arrayToObject(
              attr[accessAttr],
            );
            attributeRulesUamAccess[accessAttr] = AttributeAccess.getAction(
              transformedAccessKeys,
            );
          });
        },
      );

      // attribute level meta data access based on manifest

      const attributeRulesWithManifest = {};
      metaData.attributeGroups.forEach((attrGrp) => {
        attrGrp.attributes.forEach((attr) => {
          const accessBasedOnManifest = AttributeAccess.getManifestAction(
            attr.manifest,
          );
          attributeRulesWithManifest[attr.key] = accessBasedOnManifest;
        });
      });

      const mergedAttributeRulesAccess = {
        ...defaultAttGrpAccess,
        ...uamAttrGrpAccess,
        ...attributeRulesUamAccess,
        ...attributeRulesWithManifest,
      };
      const metaDatAttributeRulesMapping = _.merge(
        metaData.attributeToRulesMapping,
        mergedAttributeRulesAccess,
      );
      // attriute based required access to false for read access only
      Object.keys(metaDatAttributeRulesMapping).forEach((attr) => {
        const key = metaDatAttributeRulesMapping[attr]
        if (
          key.read
          && (!key.create
             && !key.update)
              && key.required
        ) {
          key.required = false;
          key.regexRule = '';
        }
        // making the type to hidden to avoid rendering in the UI
        metaData.attributeGroups.forEach((attrGrp) => {
          attrGrp.attributes.forEach((attribute) => {
            if (attribute.key === attr && !key.create && !key.read && !key.update) {
              attribute.type = Constants.manifestKeys.Hidden;
              key.required = false;
            }
          });
        });
      });

      return {
        ...metaData,
        attributeToRulesMapping: { ...metaDatAttributeRulesMapping }
      };

      // end of block
    }
    return metaData;
  }
}

module.exports = AttributeAccess;

