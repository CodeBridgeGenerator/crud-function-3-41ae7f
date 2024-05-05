const { ProfileStatus } = require('./profileStatus.class');
const createModel = require('../../models/profileStatus.model');
const hooks = require('./profileStatus.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/profileStatus', new ProfileStatus(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('profileStatus');

  service.hooks(hooks);
};