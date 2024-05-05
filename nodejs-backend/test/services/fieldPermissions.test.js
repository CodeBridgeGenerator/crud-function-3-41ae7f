const assert = require('assert');
const app = require('../../src/app');

describe('\'fieldPermissions\' service', () => {
  it('registered the service', () => {
    const service = app.service('fieldPermissions');

    assert.ok(service, 'Registered the service (fieldPermissions)');
  });
});
