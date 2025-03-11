import mongoose from "mongoose";
import env from "./env";

const connectToDB = async () => {
  const retries = 5;
  let attempt = 0;
  while (attempt < retries) {
    try {
      await mongoose.connect(env.MONGO_URI);
      console.log("Connected to the database");
      return;
    } catch (error) {
      attempt++;
      console.error(
        `Error connecting to the database (attempt ${attempt}/${retries}): `,
        error,
      );
      if (attempt === retries) {
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception: ", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection: ", error);
  process.exit(1);
});

export default connectToDB;
