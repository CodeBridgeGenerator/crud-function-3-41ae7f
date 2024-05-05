const { ServicePermissions } = require('./servicePermissions.class');
const createModel = require('../../models/servicePermissions.model');
const hooks = require('./servicePermissions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/servicePermissions', new ServicePermissions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('servicePermissions');

  service.hooks(hooks);
};