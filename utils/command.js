const { exec } = require("child_process");

const sh = async (cmd) => {
    return new Promise(function (resolve, reject) {
        // we have to increase the damn maxBuffer because we have so many versions and im too lazy, i want all at once
        exec(cmd, { maxBuffer: 1024 * 2000 }, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

module.exports = sh;