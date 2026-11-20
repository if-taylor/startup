const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${encodeURIComponent(config.userName)}:${encodeURIComponent(config.password)}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('livemygospel');

const userCollection = db.collection('user');
const goalCollection = db.collection('goal');
const habitCollection = db.collection('habit');
const completionCollection = db.collection('habitCompletion');
const eventCollection = db.collection('event');

// Verify the connection to MongoDB Atlas
async function connectDatabase() {
    await db.command({ ping: 1 });
    await userCollection.createIndex({ email: 1 }, { unique: true });
    await completionCollection.createIndex(
        { owner: 1, habitId: 1, date: 1 },
        { unique: true }
    );
    console.log('Connected to LiveMyGospel MongoDB database');
}

module.exports = {
    connectDatabase,
    userCollection,
    goalCollection,
    habitCollection,
    completionCollection,
    eventCollection,
};