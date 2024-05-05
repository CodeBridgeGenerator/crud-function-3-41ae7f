const { ServiceMeta } = require('./serviceMeta.class');
const createModel = require('../../models/serviceMeta.model');
const hooks = require('./serviceMeta.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/serviceMeta', new ServiceMeta(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('serviceMeta');

  service.hooks(hooks);
};