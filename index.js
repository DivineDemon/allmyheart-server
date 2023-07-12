import cors from "cors";
import * as dotenv from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";

import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import { default as notificationRouter } from "./routes/notificationRoute.js";

dotenv.config(); // Configure .env
const app = express(); // Initialize App
const PORT = process.env.PORT || 3000; // Initialize Port

// Middleware
app.use(cors());
app.use(errorHandler);
app.use(express.json({ limit: "200mb", extended: true }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// Routes
app.use("/api/notification", notificationRouter);

// Initialize Firebase App
initializeApp({
  credential: cert({
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_CERT,
    client_x509_cert_url: process.env.CLIENT_CERT,
    universe_domain: process.env.UNIVERSE_DOMAIN,
  }),
});

// Starting the Server
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server Active on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

startServer();
