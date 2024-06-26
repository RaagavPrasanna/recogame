import mongoose from 'mongoose';


/**
 * Wrapper around mongoose DB.
 *
 * @example
 * // Import necessary DB modules
 * import './path/to/env.js';
 * import db from './path/to/db.js';
 * import models from './path/to/models.js';
 *
 * // Connect
 * await db.connect('db-name');
 *
 * // Insert an entry
 * await models.Model.create({
 *   field: 'value',
 *   another: 'value',
 *   // ...
 * });
 *
 * // Find an entry
 * const m = await models.Model.findOne({ field: 'value' });
 *
 * // End the connection
 * await db.disconnect();
 */
class Database {
  /** @type {mongoose} */
  connection;

  /** Check if the connection to the DB is established */
  get isConnected() {
    return Boolean(this.connection);
  }

  /** Establish connection to the DB */
  async connect(db) {
    if (!this.isConnected) {
      mongoose.set('strictQuery', false);
      this.connection = await mongoose.connect(
        process.env.MONGO_CONNECTION_URI,
        {
          useNewUrlParser: true,
          dbName: db
        }
      );
      console.info('Started connection with DB');
    } else {
      console.info('Was already connected to DB');
    }
  }

  /** End connection to the DB */
  async disconnect() {
    await this.connection.disconnect();
    console.info('Connection with DB ended');
  }
}

// Because modules are cached, this line will run only once so it behaves like a singleton
const db = new Database();


export default db;

