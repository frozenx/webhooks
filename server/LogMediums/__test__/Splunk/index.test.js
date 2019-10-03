const AppDynamics = require('../../AppDynamics');

describe('AppDynamics', () => {
  test('should initiate the constructor', () => {
    const mockPayload = {};
    const AppDynamicsLog = new AppDynamics(mockPayload);
    expect(typeof AppDynamicsLog.logMessage).toBe('string');
  });
});
