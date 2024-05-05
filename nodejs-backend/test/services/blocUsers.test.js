const assert = require('assert');
const app = require('../../src/app');

describe('\'blocUsers\' service', () => {
  it('registered the service', () => {
    const service = app.service('blocUsers');

    assert.ok(service, 'Registered the service (blocUsers)');
  });
});
