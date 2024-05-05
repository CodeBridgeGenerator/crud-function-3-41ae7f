
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   roleId: { type: Schema.Types.ObjectId, ref: "" },
       position: { type: String, unique: false, lowercase: false, default: '' },
       abbr: { type: String, unique: false, lowercase: false, default: '' },
       reportingtoidPositionHierarchyId: { type: String, unique: false, lowercase: false, default: '' },
       departmentId: { type: Schema.Types.ObjectId, ref: "" },
       direct: { type: Boolean },
       ishead: { type: Boolean },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };