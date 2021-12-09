/**
 * @desc Mongo Model for User
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  role: {
    default: "user",
    type: String,
    require: true,
  },
  userCode: {
    type: String,
    require: true,
  },
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Task",
  },
});

module.exports = mongoose.model("User", userSchema);
