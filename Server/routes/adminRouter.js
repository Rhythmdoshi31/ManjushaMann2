const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { dashboardController, uploadController } = require("../controllers/adminController");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const upload = require('../utils/multer');
const adminModel = require("../models/adminModel");
const visitModel = require("../models/visitModel");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/dashboard", authMiddleware, dashboardController);


router.patch('/upload', authMiddleware, upload.single('video'), uploadController);

module.exports = router;