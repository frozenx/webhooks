const LogMedium = require('..');

describe('Log Medium', () => {
  test('should initiate the constructor and return the default medium', () => {
    const MockLogMedium = new LogMedium('Console');
    expect(typeof MockLogMedium).toBe('object');
    expect(typeof MockLogMedium.writeMedium).toBe('function');
  });
  test('should initiate the constructor and return the AppDynamics medium', () => {
    const MockLogMedium = new LogMedium('AppDynamics');
    expect(typeof MockLogMedium).toBe('object');
    expect(typeof MockLogMedium.writeMedium).toBe('function');
  });
  test('should initiate the constructor and return the Splunk medium', () => {
    const MockLogMedium = new LogMedium('Splunk');
    expect(typeof MockLogMedium).toBe('object');
    expect(typeof MockLogMedium.writeMedium).toBe('function');
  });
});

