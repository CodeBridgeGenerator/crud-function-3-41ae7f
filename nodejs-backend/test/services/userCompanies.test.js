const assert = require('assert');
const app = require('../../src/app');

describe('\'userCompanies\' service', () => {
  it('registered the service', () => {
    const service = app.service('userCompanies');

    assert.ok(service, 'Registered the service (userCompanies)');
  });
});
