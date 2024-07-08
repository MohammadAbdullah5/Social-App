const mongoose = require("mongoose"); // Import mongoose module that will be used to connect to MongoDB.
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  // Create a new schema called UserSchema.
  username: {
    type: String,
    trim: true,
    required: "Name is required",
  }, // Create a new field called name that will store the user's name. Trim any white spaces from the beginning and end of the name. Name is required.
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  }, // Create a new field called email that will store the user's email. Trim any white spaces from the beginning and end of the email. Email must be unique. Email must match the email pattern. Email is required.
  created: {
    type: Date,
    default: Date.now,
  }, // Create a new field called created that will store the date when the user was created. The default value is the current date.
  updated: Date,
  status: {
    type: Boolean,
    default: true, // Set the default value to true
  }, // Create a new field called status that will store the user's status. The default value is true.
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  profilePicture: {
    type: String,
    default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg', // Default to an empty string or a placeholder image URL
  },
  salt: String,
  following: [{ 
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  followers: [{ 
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  // Create a new field called hashed_password that will store the user's password. Password is required.
  // Actual password is not stored in the database. Instead, the hashed password is stored.
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password; // Compare the hashed password with the plain text password.
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt) // Create a new HMAC object using the SHA-1 algorithm and the salt.
        .update(password) // Update the HMAC object with the password.
        .digest("hex"); // Encode the HMAC object to a hexadecimal string.
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + ""; // Generate a random and unique salt.
  },
};

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

const User = mongoose.model("User", UserSchema); // Export the User model.
module.exports = User