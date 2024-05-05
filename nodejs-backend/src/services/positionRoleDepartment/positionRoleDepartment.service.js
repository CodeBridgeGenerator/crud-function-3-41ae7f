const { PositionRoleDepartment } = require('./positionRoleDepartment.class');
const createModel = require('../../models/positionRoleDepartment.model');
const hooks = require('./positionRoleDepartment.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/positionRoleDepartment', new PositionRoleDepartment(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('positionRoleDepartment');

  service.hooks(hooks);
};