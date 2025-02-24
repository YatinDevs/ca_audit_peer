const express = require("express");
const router = express.Router();
const formSevenControler = require("../controllers/formSevenController");

router.post("/", formSevenControler.createFormSeven);

module.exports = router;
