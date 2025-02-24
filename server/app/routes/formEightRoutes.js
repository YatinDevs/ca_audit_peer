const express = require("express");
const router = express.Router();
const formEightController = require("../controllers/formEightController");

router.post("/", formEightController.createFormEight);

module.exports = router;
