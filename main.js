const axios = require('axios').default;
const cheerio = require('cheerio');
const userAgent = require('user-agents');
main = {
    request : async (keyword)=>{
        const ua = new userAgent({deviceCategory:'desktop'}).toString();
        const {data} = await axios.get(`http://www.google.co.id/search?q=${main.formatKeyword(keyword)}&aqs=edge.0.69i59j69i57.1023j0j4&sourceid=chrome&ie=UTF-8`,{
            headers : {
                'User-Agent' : ua
            },
            proxy: {
                host: 'localhost',
                port: 3000
            }
        });
        const $ = cheerio.load(data);
        const result = $('body').find('div[id=result-stats]')?.text()?.trim();
        const response = main.format(result);
        return {keyword,...response};
    },
    formatKeyword : (value)=>{
        const regex = /\s/g;
        return value?.replace(regex,'+');
    },
    format : (value)=>{
        const regexs = [
            /Sekitar (.*) hasil \((.*?) detik\)/gm,
            /About (.*) results \((.*?) seconds\)/gm
        ];
        let response;
        regexs.map((regex,index)=>{
            const result = regex.exec(value);
            if(result?.[1] != undefined && result?.[2] != undefined){
                response =  {
                    'result' : parseFloat(result[1]?.replace(/\./g,'').replace(',', '.')),
                    'time' : parseFloat(result[2]?.replace(/\./g,'').replace(',', '.')),
                }
            }
        })
        return response;
    },
};

module.exports = main;