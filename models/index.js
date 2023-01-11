const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = ENGINE_DB === "nosql" ? "./nosql" : "./mysql";

const models = {
  usersModel: require(`${pathModels}/users`),
  tracksModel: require(`${pathModels}/tracks`),
  storageModel: require(`${pathModels}/storage`),
  cOperationStatusModel: require(`${pathModels}/cOperationStatus`),
  cOperationTransactionModel: require(`${pathModels}/cOperationTransaction`),
  cOperationTypeModel: require(`${pathModels}/cOperationType`),
  cUserModel: require(`${pathModels}/cUser`),
  cUserStatusModel: require(`${pathModels}/cUserStatus`),
  cPassword: require(`${pathModels}/cPassword`)
};

module.exports = models;
