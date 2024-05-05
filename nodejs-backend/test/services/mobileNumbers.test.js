const assert = require('assert');
const app = require('../../src/app');

describe('\'mobileNumbers\' service', () => {
  it('registered the service', () => {
    const service = app.service('mobileNumbers');

    assert.ok(service, 'Registered the service (mobileNumbers)');
  });
});
