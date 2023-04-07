const express = require("express");
const router = express.Router();
const sh = require("../../utils/command");

const alias = require("./alias/alias.js");
const devhub = require("./devhub/devhub.js");
const orgs = require("./orgs/orgs.js");

router.use("/alias", alias);
router.use("/devhub", devhub);
router.use("/orgs", orgs);

router.get("/", function (req, res) {
    res.send("sfdx");
});

module.exports = router;