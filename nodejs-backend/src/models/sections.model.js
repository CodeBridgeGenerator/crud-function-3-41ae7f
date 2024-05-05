
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   companyId: { type: Schema.Types.ObjectId, ref: "" },
       branchId: { type: Schema.Types.ObjectId, ref: "" },
       departmentId: { type: Schema.Types.ObjectId, ref: "" },
       section: { type: String, unique: false, lowercase: false, default: '' },
       isHead: { type: Boolean },
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