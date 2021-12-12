/**
 * @desc Mongo model for Task
 */

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  details: {
    type: String,
  },
  priority: {
    type: String,
    require: true,
  },
  // is the userCode used by user
  ownerUserCode: {
    type: String,
    require: true,
  },
  done: {
    type: Boolean,
    require: true,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
