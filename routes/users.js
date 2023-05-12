var express = require("express");
var router = express.Router();

const { indexController } = require("../controllers/users");

router.get("/signup", indexController);

module.exports = router;
