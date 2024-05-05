const { FieldPermissions } = require('./fieldPermissions.class');
const createModel = require('../../models/fieldPermissions.model');
const hooks = require('./fieldPermissions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/fieldPermissions', new FieldPermissions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('fieldPermissions');

  service.hooks(hooks);
};