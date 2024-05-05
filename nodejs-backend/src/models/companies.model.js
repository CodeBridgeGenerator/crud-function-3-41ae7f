
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   companyName: { type: String, unique: false, lowercase: false, default: '' },
       companyNo: { type: String, unique: false, lowercase: false, default: '' },
       brandName: { type: String, unique: false, lowercase: false, default: '' },
       website: { type: String, unique: false, lowercase: false, default: '' },
       addressId: { type: String, unique: false, lowercase: false, default: '' },
       logourl: { type: String, unique: false, lowercase: false, default: '' },
       companyEmail: { type: String, unique: false, lowercase: false, default: '' },
       phoneTypeId: { type: Schema.Types.ObjectId, ref: "" },
       faxTypeId: { type: String, unique: false, lowercase: false, default: '' },
       isDefault: { type: Boolean },

            
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