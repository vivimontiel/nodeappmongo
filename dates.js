const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

module.exports = (async function() {
  // Connection URL
  const url = 'mongodb://localhost:27017/';
  // Database Name
  const dbName = 'nodeapp';
  const client = new MongoClient(url);

  try {
    // Use connect method to connect to the Server
    await client.connect();

    const db = client.db(dbName);

    // Get the collection
    const col = db.collection('dates');

    let r = await db.collection('dates').insertOne({ date: new Date() });
    assert.equal(1, r.insertedCount);
    r = await db.collection('dates').insertMany([{ date: new Date() }, { date: new Date() }, { date: new Date() }]);
    assert.equal(3, r.insertedCount);

    const docs = await col.find().toArray();
    console.log(docs);

  } catch (err) {
    console.log(err.stack);
  }

  client.close();
})();
