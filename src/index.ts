import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Config imports
import env from "@config/env";
import connectToDB from "@config/db";

// Middleware imports
import { setAnonymousId } from "./middlewares/setAnonymousId";
import errorHandler from "@middlewares/errorhandler";

// Route imports
import router from "./routes";
import notFound from "@middlewares/notFound";

const app: Application = express();

// Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://vote-app-client-m517.vercel.app',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set anonymous ID
app.use(setAnonymousId);

// Basic route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the API",
  });
});

// API routes
app.use("/api/v1", router);

// Custom middlewares
app.use(errorHandler);
app.use(notFound);

// Start the server
app.listen(env.PORT, async () => {
  await connectToDB();
  console.log(`Server started on port ${env.PORT}`);
});
