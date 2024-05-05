const { FieldMeta } = require('./fieldMeta.class');
const createModel = require('../../models/fieldMeta.model');
const hooks = require('./fieldMeta.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/fieldMeta', new FieldMeta(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('fieldMeta');

  service.hooks(hooks);
};