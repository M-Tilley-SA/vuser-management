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
function createUser(userId) {
  return client
    .db(defaultMongoDbName)
    .collection('users')
    .insertOne({
      first_name: 'Matthew',
      last_name: 'Tilley',
      contact_number: '082 233 1235',
      email_address: 'matthew.tilley19@gmail.com',
      date_of_birth: '22/03/1992',
      address: {
        street_address: '12 Freedom Rd',
        city: 'Johannesburg',
        postal_code: '2194',
        country: 'South Africa',
      },
      skills: [
        {
          skill_name: 'Meme creation',
          years_experience: '3',
          skill_rating: 4,
        },
        {
          skill_name: 'Troll',
          years_experience: '30',
          skill_rating: 5,
        },
      ],
      user_id: userId,
    });
}

function getUser(userId) {
  const query = {
    user_id: userId,
  };
  return client.db(defaultMongoDbName).collection('users').findOne(query);
}

function updateUser(userId, employeeJsonData) {
  console.log(userId, employeeJsonData);
  const filterQuery = {
    user_id: userId,
  };
  const updateDocument = {
    $set: employeeJsonData,
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
