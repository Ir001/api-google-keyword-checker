const express = require('express')
const bodyParser = require('body-parser');
const main = require('./main');
const googleapis = require('./googleapis');
const app = express()
const port = process.env.PORT || 3000;
app.use(function (req, res, next) {
    var data = "";
    req.on('data', function (chunk) {
        data += chunk
    })
    req.on('end', function () {
        req.rawBody = data;
        next();
    })
})

app.post('/api/', async (req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header('Access-Control-Allow-Methods', 'POST');
        const rawBody = JSON.parse(req.rawBody);
        const data = rawBody?.keywords.map(async (value,index)=>{
            if(value != null && value != undefined && value != ''){
                return await main.request(value);
            }
        })
        const response = await Promise.all(data);
        return res.json({
            success: true,
            data : response});
    } catch (err) {
        return res.json({
            success: false,
            message: err.toString()
        });
    }
})
app.post('/api/v2', async (req, res, next) => {
    try {
        console.log(req);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header('Access-Control-Allow-Methods', 'POST');
        const rawBody = JSON.parse(req.rawBody);
        const data = rawBody?.keywords.map(async (value,index)=>{
            if(value != null && value != undefined && value != ''){
                return await googleapis.request(value);
            }
        })
        const response = await Promise.all(data);
        return res.json({
            success: true,
            data : response});
    } catch (err) {
        return res.json({
            success: false,
            message: err.toString()
        });
    }
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})