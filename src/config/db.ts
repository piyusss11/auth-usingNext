import mongoose, { connection } from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    connection.on("connected", () => {
      console.log("Connected to DB");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDb connection error,please make sure your DB is running",
        err
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Could not connect to DB", error);
  }
};
