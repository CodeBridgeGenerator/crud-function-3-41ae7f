const { Phones } = require('./phones.class');
const createModel = require('../../models/phones.model');
const hooks = require('./phones.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/phones', new Phones(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('phones');

  service.hooks(hooks);
};