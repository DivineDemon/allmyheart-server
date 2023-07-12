import { Router } from "express";
import { sendNotification } from "../controllers/notificationController.js";

const router = new Router();

router.post("/", sendNotification);

export default router;
