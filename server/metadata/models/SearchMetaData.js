const metaDataConfig = require('../metaDataConfig');

class SearchMetaData {
  constructor(payload) {
    this.searchMetaData = SearchMetaData.resolveSearchMetaData(payload);
  }

  static resolveSearchMetaData(metaDataCollection) {
    return Object.values(metaDataCollection).reduce(
      (acc, { attributeGroupProjections }) => {
        attributeGroupProjections.forEach(({ attributes }) =>
          attributes.forEach(({ name, displayNames: [{ displayName }] }) =>
            metaDataConfig.searchMetaDataConfig.indexOf(name) > -1
              ? (acc[name] = { displayName })
              : null,
          ),
        );
        return acc;
      },
      {},
    );
  }
}

module.exports = SearchMetaData;
