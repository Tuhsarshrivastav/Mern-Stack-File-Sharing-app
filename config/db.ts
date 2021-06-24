import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB!, {
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log("Database Connection error", error.message);
  }
  const connection = mongoose.connection;
  if (connection.readyState >= 1) {
    console.log("Connected to database");
    return;
  }
  connection.on("error", () => console.log("connection is failed"));
};

export default connectDb;
