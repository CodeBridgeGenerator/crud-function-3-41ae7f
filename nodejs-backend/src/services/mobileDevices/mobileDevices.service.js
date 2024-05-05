const { MobileDevices } = require('./mobileDevices.class');
const createModel = require('../../models/mobileDevices.model');
const hooks = require('./mobileDevices.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/mobileDevices', new MobileDevices(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mobileDevices');

  service.hooks(hooks);
};