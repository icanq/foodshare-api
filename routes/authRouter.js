const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/jwt", authController.createJwtToken);
router.post("/logout", authController.handleLogout);

module.exports = router;
