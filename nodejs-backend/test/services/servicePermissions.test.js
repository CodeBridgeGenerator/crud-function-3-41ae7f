const assert = require('assert');
const app = require('../../src/app');

describe('\'servicePermissions\' service', () => {
  it('registered the service', () => {
    const service = app.service('servicePermissions');

    assert.ok(service, 'Registered the service (servicePermissions)');
  });
});
