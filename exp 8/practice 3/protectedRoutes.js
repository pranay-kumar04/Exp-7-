import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin route
router.get("/admin-dashboard", verifyToken, authorizeRoles("Admin"), (req, res) => {
  res.json({
    message: "Welcome to the Admin dashboard",
    user: req.user
  });
});

// Moderator route
router.get("/moderator-panel", verifyToken, authorizeRoles("Moderator"), (req, res) => {
  res.json({
    message: "Welcome to the Moderator panel",
    user: req.user
  });
});

// User route
router.get("/user-profile", verifyToken, authorizeRoles("User", "Admin", "Moderator"), (req, res) => {
  res.json({
    message: `Welcome to your profile, ${req.user.username}`,
    user: req.user
  });
});

export default router;
