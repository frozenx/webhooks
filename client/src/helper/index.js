import i18Data from '../languagepack';

const extractCurrentPageAccess = (pathname, context) => {
  const urlItems = pathname === '/' ? pathname : pathname.split('/');
  const currentPageAccessList =
    context.page[urlItems[urlItems.length - 1].toLowerCase()];
  return currentPageAccessList;
};

const createRow = (data, tabId) => {
  const attributes = tabId === 'tab2' ? 'siteAttributes' : 'tncAttributes';
  const rowData = data[attributes].map((siteAttr) => {
    const tempObj = { uuid: data.uuid };
    const existingValues =
      tabId === 'tab2' ? i18Data.SITE_BODY_VALUES : i18Data.PAYMENT_BODY_VALUES;
    siteAttr.attributes.forEach((attr) => {
      if (existingValues.includes(attr.name)) {
        tempObj[attr.name] = attr.values[0].value;
      }
    });
    return tempObj;
  });
  return rowData;
};

const mergeArrayAndUpdateProperites = (exisitngData, updatedData) => {
  const merge = (target, map = new Map()) => source => {
      var object = {};
      if (!map.has(source.uuid)) {
        map.set(source.uuid, object);
        target.push(object);
      }
      Object.assign(map.get(source.uuid), source);
    },
    result = [],
    update = merge(result);

  [exisitngData, updatedData].forEach(a => a.forEach(update));

  return result;
};

const getCookie = (name) => {
  const match = document.cookie.match(RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
};

const metaDataHeaderDisplayNamesResolver = (header, data) => {
  const resolvedData = header.map((attribute) => {
    const temp = data.find((attr) => {
      if (attribute.key === 'partnerName') {
        return attr;
      }
      return attr.name === attribute.key;
    });
    const constructedData = { ...temp, displayName: attribute.displayName };
    return constructedData;
  });
  return resolvedData;
};

export default {
  extractCurrentPageAccess,
  createRow,
  mergeArrayAndUpdateProperites,
  getCookie,
  metaDataHeaderDisplayNamesResolver,
};
