import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'hono_app';

let db;

export async function connectDB() {
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
}

export function getDB() {
    if (!db) throw new Error('Database not initialized. Call connectDB first.');
    return db;
}
