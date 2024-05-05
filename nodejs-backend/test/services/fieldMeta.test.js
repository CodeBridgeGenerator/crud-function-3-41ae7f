const assert = require('assert');
const app = require('../../src/app');

describe('\'fieldMeta\' service', () => {
  it('registered the service', () => {
    const service = app.service('fieldMeta');

    assert.ok(service, 'Registered the service (fieldMeta)');
  });
});
