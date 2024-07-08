const mongoose = require("mongoose");
const { config } = require("./../config/config.js");

const connectDB = async () => { // Create a new function called connectDB that will connect to database.
    try {
      const connect = await mongoose.connect(config.mongoUri); // Connect to MongoDB using mongoose.connect() method.
      console.log(`MongoDB Connected: ${connect.connection.host}`); // If connection is successful, print the host name.
    } catch (err) { // If connection is unsuccessful, print the error message and exit the process.
      console.log(err); // Print the error message.
      process.exit(1); // Exit the process.
    }
  };

module.exports = connectDB; // Export the connectDB function.