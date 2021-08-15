const express = require('express')
const main = require('./main')
const app = express()
const port = process.env.PORT || 3000;
app.get('/api/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    const keyword = req.query?.keyword;
    if(keyword == undefined || keyword == '' || keyword == null){
        return res.json({success:false,message:'Keyword required'});
    }
    try{
        const response = await main.request(keyword);
        return res.json(response);
    }catch(err){
        return res.json({success:false,message: err.toString()});
    }
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})