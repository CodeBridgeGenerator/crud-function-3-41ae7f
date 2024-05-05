const assert = require('assert');
const app = require('../../src/app');

describe('\'ipLoginAccess\' service', () => {
  it('registered the service', () => {
    const service = app.service('ipLoginAccess');

    assert.ok(service, 'Registered the service (ipLoginAccess)');
  });
});
