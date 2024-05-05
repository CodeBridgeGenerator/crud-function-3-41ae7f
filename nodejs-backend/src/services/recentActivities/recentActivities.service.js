const { RecentActivities } = require('./recentActivities.class');
const createModel = require('../../models/recentActivities.model');
const hooks = require('./recentActivities.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/recentActivities', new RecentActivities(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('recentActivities');

  service.hooks(hooks);
};