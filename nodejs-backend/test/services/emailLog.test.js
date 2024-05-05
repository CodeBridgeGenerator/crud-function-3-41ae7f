const assert = require('assert');
const app = require('../../src/app');

describe('\'emailLog\' service', () => {
  it('registered the service', () => {
    const service = app.service('emailLog');

    assert.ok(service, 'Registered the service (emailLog)');
  });
});
