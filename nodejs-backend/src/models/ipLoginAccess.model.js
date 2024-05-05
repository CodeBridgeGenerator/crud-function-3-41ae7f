
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   userId: { type: Schema.Types.ObjectId, ref: "" },
       roleId: { type: Schema.Types.ObjectId, ref: "" },
       startIp: { type: String, unique: false, lowercase: false, default: '' },
       endIp: { type: String, unique: false, lowercase: false, default: '' },
       allowedStartTime: { type: Date },
       allowedEndTime: { type: Date },
       blockedStartTime: { type: Date },
       blockedEndTime: { type: Date },

            
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