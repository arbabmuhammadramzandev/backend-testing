const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  Nationality: {
    type: String,
  },
  role: {
    type: String,
    default: "customer",
  },
  verified: {
    type: Boolean,
  },
  
  personRole: {
    type: Object,
  },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});
exports.User = mongoose.model("User", userSchema);
