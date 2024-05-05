const assert = require('assert');
const app = require('../../src/app');

describe('\'recentActivities\' service', () => {
  it('registered the service', () => {
    const service = app.service('recentActivities');

    assert.ok(service, 'Registered the service (recentActivities)');
  });
});
