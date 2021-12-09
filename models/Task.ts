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
    require: true,
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
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
