const assert = require('assert');
const app = require('../../src/app');

describe('\'passwordHistory\' service', () => {
  it('registered the service', () => {
    const service = app.service('passwordHistory');

    assert.ok(service, 'Registered the service (passwordHistory)');
  });
});
