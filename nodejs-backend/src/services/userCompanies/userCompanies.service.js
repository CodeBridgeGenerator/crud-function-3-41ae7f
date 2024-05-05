const { UserCompanies } = require('./userCompanies.class');
const createModel = require('../../models/userCompanies.model');
const hooks = require('./userCompanies.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/userCompanies', new UserCompanies(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('userCompanies');

  service.hooks(hooks);
};