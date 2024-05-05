const assert = require('assert');
const app = require('../../src/app');

describe('\'serviceMeta\' service', () => {
  it('registered the service', () => {
    const service = app.service('serviceMeta');

    assert.ok(service, 'Registered the service (serviceMeta)');
  });
});
