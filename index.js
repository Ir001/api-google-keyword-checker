const express = require('express')
const main = require('./main')
const app = express()
const port = process.env.PORT || 3000;
app.get('/api/', async (req, res) => {
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