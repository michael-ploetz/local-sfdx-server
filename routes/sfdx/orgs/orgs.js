const express = require("express");
const router = express.Router();
const sh = require("../../../utils/command");

router.get("/", async function (req, res) {
    let { stdout } = await sh('sfdx force:org:list --json');
    res.json(JSON.parse(stdout));
});

router.get("/:username/open", async function (req, res) {
    let { stdout } = await sh(`sfdx force:org:open -u ${req.params.username} --json`);
    res.json(JSON.parse(stdout));
});


module.exports = router;