const mongoDbUrl = `mongodb+srv://r3as0n:hmcwgGo5VnOKPkfJ@cluster0.igq05.mongodb.net/employees?retryWrites=true&w=majority`;
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let defaultMongoDbName = 'employees';
async function connectToDb(dbName = 'employees') {
  defaultMongoDbName = dbName;
  return new Promise((resolve, reject) => {
    client.connect(async (err, client) => {
      err && reject(err);

      const db = client.db(dbName);
      console.log(`Connected to MongoDB: ${dbName}`);
      resolve({
        db,
        client,
      });
    });
  }).catch((err) => console.error(err));
}

function getAllUsers() {
  return client.db(defaultMongoDbName).collection('users').find({});
}
/**
 *
 * @param {*} userId
 * @returns
 */
function createUser ( userObject ) {
  return client
    .db(defaultMongoDbName)
    .collection('users')
    .insertOne(userObject);
}

function getUser(userId) {
  const query = {
    user_id: userId,
  };
  return client.db(defaultMongoDbName).collection('users').findOne(query);
}

function updateUser(userId, employeeJsonData) {
  // remove _id from payload to avoid MongoDB error
  const { _id, ...user } = employeeJsonData;
  const filterQuery = {
    user_id: userId,
  };
  const updateDocument = {
    $set: user,
  };
  return client
    .db(defaultMongoDbName)
    .collection('users')
    .updateOne(filterQuery, updateDocument);
}

function deleteUser(userId) {
  const filterQuery = {
    user_id: userId,
  };
  return client
    .db(defaultMongoDbName)
    .collection('users')
    .deleteMany(filterQuery);
}
function deleteAllUsers() {
  return client.db(defaultMongoDbName).collection('users').deleteMany();
}

module.exports = {
  client,
  connectToDb,
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
