
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

// Connection URL
// const url = 'mongodb://localhost:27017'; // "mongodb://localhost:3030"

// Database Name
const dbName = 'task_db';
const url= process.env.NODE_ENV === 'production' 
? 'mongodb+srv://toys1:1234@cluster0.z2lwcfr.mongodb.net/?retryWrites=true&w=majority'
:'mongodb://localhost:27017'
var dbConn = null;

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true }, { useNewUrlParser: true });
        const db = client.db(dbName);
        dbConn = db;
        console.log('DB connected!')
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}


async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

function toObjectId(id) {
    return new ObjectId(id)
}

module.exports = {
    toObjectId,
    getCollection
}