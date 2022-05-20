const { Schema, model } = require("mongoose");

const KindsSchema = new Schema({
  kind: {
    type: String,
    required: true,
  },
});

const Kind = model("Kind", KindsSchema, "kinds");

module.exports = Kind;
