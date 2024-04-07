const express = require("express");
const AuthenticationController = require("../controllers/authenticationController");
const router = express.Router();

const authenticationController = new AuthenticationController();

router.post("/", authenticationController.login);

module.exports = router;
