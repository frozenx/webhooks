const Splunk = require('../../Splunk');

describe('Splunk', () => {
  test('should initiate the constructor', () => {
    const mockPayload = {};
    const SplunkLog = new Splunk(mockPayload);
    expect(typeof SplunkLog.logMessage).toBe('string');
  });
});
