const express = require("express");
const router = express.Router();
const formNineControler = require("../controllers/formNineController");

router.post("/", formNineControler.createFormNine);

module.exports = router;
