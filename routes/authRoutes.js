const express = require("express");
const AuthenticationController = require("../Controllers/authController");
const router = express.Router();

const authenticationController = new AuthenticationController();

router.post("/", authenticationController.login);

module.exports = router;
