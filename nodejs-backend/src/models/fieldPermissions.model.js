
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   roleId: { type: Schema.Types.ObjectId, ref: "" },
       userId: { type: Schema.Types.ObjectId, ref: "" },
       serviceId: { type: String, unique: false, lowercase: false, default: '' },
       fieldId: { type: String, unique: false, lowercase: false, default: '' },
       read: { type: Boolean },
       create: { type: Boolean },
       patchany: { type: Boolean },
       patchown: { type: Boolean },
       deleteany: { type: Boolean },
       deleteown: { type: Boolean },

            
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