const express = require('express')
const app = express()
var cors = require('cors')

const port = 3000
const sfdx = require("./routes/sfdx/sfdx.js");

var cache = new Map();

app.use(cors())
// poor mans cache
app.use((req, res, next) => {
    const skipCache = req.query.skipcache;
    if (cache.has(req.originalUrl) && !skipCache) {
        res.json(cache.get(req.url));
        return;
    } else {
        res.jsonResponse = res.json;
        res.json = (response) => {
            cache.set(req.originalUrl, response);
            res.jsonResponse(response);
        }
    }
    next();
})
app.use("/sfdx", sfdx);

app.get('/', (req, res) => {
    res.send('Hello Local SFDX Server!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})