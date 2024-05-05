const { Invitations } = require('./invitations.class');
const createModel = require('../../models/invitations.model');
const hooks = require('./invitations.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/invitations', new Invitations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('invitations');

  service.hooks(hooks);
};