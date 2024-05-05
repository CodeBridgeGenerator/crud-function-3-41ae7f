const { PasswordHistory } = require('./passwordHistory.class');
const createModel = require('../../models/passwordHistory.model');
const hooks = require('./passwordHistory.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/passwordHistory', new PasswordHistory(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('passwordHistory');

  service.hooks(hooks);
};