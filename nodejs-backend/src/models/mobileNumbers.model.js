
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   userId: { type: Schema.Types.ObjectId, ref: "" },
       mobileno: { type: Number },
       country: { type: Number },
       operator: { type: String, unique: false, lowercase: false, default: '' },
       mobile: { type: Number },

            
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