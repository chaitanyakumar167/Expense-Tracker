const passwordController = require("../controllers/password");
const express = require("express");
const router = express.Router();

router.post("/forgotpassword", passwordController.forgotPassword);

module.exports = router;
