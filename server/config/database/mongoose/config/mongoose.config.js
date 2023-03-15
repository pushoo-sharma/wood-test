const mongoose = require("mongoose");
const runSeed = require("../seeder");
class DatabaseConfig {
  connect = (url) => {
    return new Promise((resolve, reject) => {
      mongoose.set('strictQuery', true);
      mongoose
        .connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(async () => {
          try {
            __logger.info("Database connected successfully!");
            __logger.info("Database seed started!");
            await runSeed()
            __logger.info("Database seed completed!");
            resolve();
          } catch (error) {
            __logger.error("Failed to load seeders!");
            reject(error);
          }
        })
        .catch((err) => {
          __logger.error("Failed to connect Database!");
          reject(err);
        });
    });
  };

  disconnect = () => {
    mongoose.connection.close();
  };

  getCollection = (collectionName) => {
    return new Promise((resolve, reject) => {
      mongoose.connection.db.collection(collectionName, function (err, collection) {
        if(err) {
          return reject(err)
        }
        resolve(collection)
      });
    })
  }
}
module.exports = new DatabaseConfig();
