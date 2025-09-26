const express = require("express");

const router = express.Router();

router.get("/hello", require("./sayHello"));

module.exports = router;
