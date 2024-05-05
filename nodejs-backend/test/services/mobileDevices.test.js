const assert = require('assert');
const app = require('../../src/app');

describe('\'mobileDevices\' service', () => {
  it('registered the service', () => {
    const service = app.service('mobileDevices');

    assert.ok(service, 'Registered the service (mobileDevices)');
  });
});
