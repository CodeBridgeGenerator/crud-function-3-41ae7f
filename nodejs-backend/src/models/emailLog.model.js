
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   fromUserId: { type: Schema.Types.ObjectId, ref: "" },
       toff: { type: Schema.Types.ObjectId, ref: "" },
       ccff: { type: Schema.Types.ObjectId, ref: "" },
       bcc: { type: Schema.Types.ObjectId, ref: "" },
       content: { type: String, unique: false, lowercase: false, default: '' },
       subject: { type: String, unique: false, lowercase: false, default: '' },
       attachmentCount: { type: String, unique: false, lowercase: false, default: '' },

            
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