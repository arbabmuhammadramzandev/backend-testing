const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }
  
});

categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

categorySchema.set("toJSON", {
  virtuals: true,
});
exports.Category = mongoose.model("Category", categorySchema);
