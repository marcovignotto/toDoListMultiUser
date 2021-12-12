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
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
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
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

userSchema.virtual("allTasks", {
  ref: "Task",
  localField: "tasks",
  foreignField: "_id",
  justOne: false,
});

module.exports = mongoose.model("User", userSchema);
