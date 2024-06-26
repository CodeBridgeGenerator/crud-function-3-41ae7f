const { Preferences } = require('./preferences.class');
const createModel = require('../../models/preferences.model');
const hooks = require('./preferences.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/preferences', new Preferences(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('preferences');

  service.hooks(hooks);
};