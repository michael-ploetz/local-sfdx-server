const express = require("express");
const router = express.Router();
const sh = require("../../../utils/command");

router.get("/", async function (req, res) {
    let { stdout } = await sh('sfdx alias:list --json');
    res.json(JSON.parse(stdout));
});

module.exports = router;