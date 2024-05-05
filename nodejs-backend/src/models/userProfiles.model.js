
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   userId: { type: Schema.Types.ObjectId, ref: "" },
       imageUrl: { type: String, unique: false, lowercase: false, default: '' },
       profileStatusId: { type: String, unique: false, lowercase: false, default: '' },
       uuId: { type: String, unique: false, lowercase: false, default: '' },
       oauthProviderId: { type: String, unique: false, lowercase: false, default: '' },
       oauthProviderName: { type: String, unique: false, lowercase: false, default: '' },
       loginTypeId: { type: String, unique: false, lowercase: false, default: '' },
       dateOfBirth: { type: String, unique: false, lowercase: false, default: '' },
       gender: { type: String, unique: false, lowercase: false, default: '' },
       accountStatus: { type: String, unique: false, lowercase: false, default: '' },
       currentMobileNumberId: { type: Schema.Types.ObjectId, ref: "" },
       currentRoleId: { type: Schema.Types.ObjectId, ref: "" },
       currentCompanyId: { type: Schema.Types.ObjectId, ref: "" },
       currentBranchId: { type: Schema.Types.ObjectId, ref: "" },
       currentDepartmentId: { type: Schema.Types.ObjectId, ref: "" },
       currentSubDepartmentId: { type: Schema.Types.ObjectId, ref: "" },

            
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