const AttributeAccess = require('../../models/AttributeAccess');
const mockData = require('../mockData');
const constants = require('../../../constants');

describe('Given the model is initialized', () => {
  const payload = mockData.getAttributeAccessMock;
  const expectedOutput = mockData.expectedAttributeAccessMock;
  const {
    uamAccessKeyWords: { READ },
    manifestKeys: { Hidden, ReadOnly, Editable },
  } = constants;
  test('should the model be initialized', () => {
    const attributeAccess = new AttributeAccess(payload);
    expect(attributeAccess.uamAccess).toBe(payload.uamAccess);
    expect(attributeAccess.metaData).toBe(payload.transformedMetaData);
    expect(attributeAccess.entityType).toBe(payload.entityType);
  });
  test('should return the updated meta data', () => {
    const attributeAccess = new AttributeAccess(payload);
    expect(attributeAccess.updatedMetaData).toEqual(expectedOutput);
  });
  test('should return attributeRules with required and regexRule as falsy values', () => {
    const updatedPayloadWithRead = { ...payload };
    updatedPayloadWithRead.uamAccess.resources.attribute.partner.partner[0].uuid = [
      READ,
    ];
    updatedPayloadWithRead.transformedMetaData.attributeGroups[0].attributes[0].manifest = ReadOnly;
    updatedPayloadWithRead.transformedMetaData.attributeToRulesMapping.uuid.required = true;
    const attributeAccess = new AttributeAccess(updatedPayloadWithRead);
    expect(attributeAccess.updatedMetaData).toEqual(
      mockData.expectedAttributeAccessMockWithReadAccessOnly,
    );
  });
  test('should return the meta data if uam is empty', () => {
    const payloadWithUamEmpty = { ...payload };
    payloadWithUamEmpty.uamAccess = '';
    const attributeAccess = new AttributeAccess(payloadWithUamEmpty);
    expect(attributeAccess.updatedMetaData).toEqual(mockData.expectedAttributeAccessMockWithUamEmpty);
  })
  describe('should return the access object based on the manifest', () => {
    test('should return all access as false when manifest is hidden', () => {
      expect(AttributeAccess.getManifestAction(Hidden)).toEqual(
        mockData.expectedManifestAccess.hidden,
      );
    });
    test('should return read as true only when manifest is readOnly', () => {
      expect(AttributeAccess.getManifestAction(ReadOnly)).toEqual(
        mockData.expectedManifestAccess.readOnly,
      );
    });
    test('should return all access as true when manifest is editable', () => {
      expect(AttributeAccess.getManifestAction(Editable)).toEqual(
        mockData.expectedManifestAccess.editable,
      );
    });
    test('should return all access as false when manifest is default', () => {
      expect(AttributeAccess.getManifestAction('default')).toEqual(
        mockData.expectedManifestAccess.hidden,
      );
    });
  });
});
