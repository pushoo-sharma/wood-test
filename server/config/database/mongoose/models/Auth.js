const mongoose = require("mongoose");
const {ROLES_VALUES} = require('../../../../constant/app')
const bcrypt = require("bcrypt");

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;
const AuthSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      index: { unique: true },
    },
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String
    },
    address: {
      type: String
    },
    identifier: {
      type: String,
    },
    gstNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: Number,
      required: true,
      enum: Object.values(ROLES_VALUES),
      default: ROLES_VALUES.customer
    },
  },
  { timestamps: true }
);
AuthSchema.pre("save", function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// A database method to compare password
AuthSchema.methods.comparePassword = function (candidatePassword) {
  const currentPassword = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, currentPassword, function (err, isMatch) {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};
module.exports = mongoose.model("Auth", AuthSchema);
