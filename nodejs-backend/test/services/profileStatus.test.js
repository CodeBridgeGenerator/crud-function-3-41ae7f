const assert = require('assert');
const app = require('../../src/app');

describe('\'profileStatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('profileStatus');

    assert.ok(service, 'Registered the service (profileStatus)');
  });
});
