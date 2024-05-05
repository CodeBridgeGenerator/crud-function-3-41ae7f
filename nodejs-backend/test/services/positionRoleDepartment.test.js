const assert = require('assert');
const app = require('../../src/app');

describe('\'positionRoleDepartment\' service', () => {
  it('registered the service', () => {
    const service = app.service('positionRoleDepartment');

    assert.ok(service, 'Registered the service (positionRoleDepartment)');
  });
});
