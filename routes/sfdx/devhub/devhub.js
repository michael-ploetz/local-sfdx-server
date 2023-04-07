const express = require("express");
const router = express.Router();
const sh = require("../../../utils/command");

router.get("/:username/packages", async function (req, res) {
    let { stdout } = await sh(`sfdx force:package:list -v ${req.params.username} --verbose --json`);
    res.json(JSON.parse(stdout));
});

router.get("/:username/packages/:packageid/versions", async function (req, res) {
    let { stdout } = await sh(`sfdx force:package:version:list -v ${req.params.username} -p ${req.params.packageid} --verbose --json`);
    res.json(JSON.parse(stdout));
});

router.get("/:username/packageversions/", async function (req, res) {
    let { stdout } = await sh(`sfdx force:package:version:list -v ${req.params.username} --verbose --json`);
    res.json(JSON.parse(stdout));
});

router.get("/:username/packageversions/:subscriberId/:key/dependencies", async function (req, res) {
    let { stdout } = await sh(`sfdx force:data:soql:query -u ${req.params.username} -t -q "SELECT Dependencies FROM SubscriberPackageVersion WHERE Id='${req.params.subscriberId}' AND InstallationKey = '${req.params.key}'" --json`);
    res.json(JSON.parse(stdout));
});

router.get("/:username/packageversions/:subscriberId/dependencies", async function (req, res) {
    let { stdout } = await sh(`sfdx force:data:soql:query -u ${req.params.username} -t -q "SELECT Dependencies FROM SubscriberPackageVersion WHERE Id='${req.params.subscriberId}'" --json`);
    res.json(JSON.parse(stdout));
});

router.get("/:username/packageversions/:subscriberId/promote", async function (req, res) {
    let { stdout } = await sh(`sfdx force:package:version:promote -v ${req.params.username} -p ${req.params.subscriberId} -n --json`);
    res.json(JSON.parse(stdout));
});

router.get("/:username/packageversions/:subscriberId/delete", async function (req, res) {
    let { stdout } = await sh(`sfdx force:package:version:delete -v ${req.params.username} -p ${req.params.subscriberId} -n --json`);
    res.json(JSON.parse(stdout));
});

module.exports = router;