const { MobileNumbers } = require('./mobileNumbers.class');
const createModel = require('../../models/mobileNumbers.model');
const hooks = require('./mobileNumbers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/mobileNumbers', new MobileNumbers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mobileNumbers');

  service.hooks(hooks);
};