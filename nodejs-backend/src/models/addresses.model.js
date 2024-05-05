
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   morphid: { type: Schema.Types.ObjectId, ref: "" },
       morphname: { type: String, unique: false, lowercase: false, default: '' },
       street: { type: String, unique: false, lowercase: false, default: '' },
       street2: { type: String, unique: false, lowercase: false, default: '' },
       city: { type: String, unique: false, lowercase: false, default: '' },
       postcode: { type: String, unique: false, lowercase: false, default: '' },
       state: { type: String, unique: false, lowercase: false, default: '' },
       country: { type: String, unique: false, lowercase: false, default: '' },

            
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