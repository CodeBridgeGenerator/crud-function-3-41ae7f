
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   fieldId: { type: String, unique: false, lowercase: false, default: '' },
       descriptive: { type: String, unique: false, lowercase: false, default: '' },
       structural: { type: String, unique: false, lowercase: false, default: '' },
       administrative: { type: String, unique: false, lowercase: false, default: '' },
       reference: { type: String, unique: false, lowercase: false, default: '' },
       statistical: { type: String, unique: false, lowercase: false, default: '' },
       legal: { type: String, unique: false, lowercase: false, default: '' },

            
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