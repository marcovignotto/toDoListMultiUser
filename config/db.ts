require("dotenv").config({ path: __dirname + "/.env" });
import mongoose from "mongoose";

const db: string = process.env.MONGODB_URI;

const connectDb: Function = async (): Promise<void> => {
  try {
    await mongoose.connect(db);
    // ! just for unit testing
    // await mongoose.connection.db.dropCollection("events");

    console.log(`MongoDB connected...`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
