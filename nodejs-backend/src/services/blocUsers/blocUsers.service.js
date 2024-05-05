const { BlocUsers } = require('./blocUsers.class');
const createModel = require('../../models/blocUsers.model');
const hooks = require('./blocUsers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/blocUsers', new BlocUsers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('blocUsers');

  service.hooks(hooks);
};