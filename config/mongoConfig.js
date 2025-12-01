const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    let dbConnectionString = process.env.MONGO_URI;
    if (!dbConnectionString) {
      throw new Error('MONGODB_URI is not defined in your environment');
    } else {
      await mongoose.connect(dbConnectionString).then(() => {
        console.log('MongoDB connected');
        return true;
      }).catch(err => {
        console.error('Connection error:', err);
        return false;
      });
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    return false;
  }
};

module.exports = connectToMongoDB;
