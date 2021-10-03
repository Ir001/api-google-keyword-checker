const axios = require('axios').default;
const userAgent = require('user-agents');
googleapis = {
    request : async (keyword)=>{
        try{
            const ua = new userAgent({deviceCategory:'desktop'}).toString();
            console.log(googleapis.formatKeyword(keyword));
            const {data} = await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDLyvAmzjPQhYExny85ZGawRPMps5Dvs7c&cx=245e4667658debe04&q=${googleapis.formatKeyword(keyword)}`,{
                headers : {
                    'User-Agent' : ua
                },
                // proxy: {
                //     host: 'localhost',
                //     port: 3000,
                //     auth: {username:'', password : ''},
                //     protocol : 'https'
                // }
            });
            const searchInformation = data?.searchInformation;

            return {
                keyword,
                result : parseFloat(searchInformation?.totalResults),
                time : parseFloat(searchInformation?.searchTime),
            };
        }catch(err){
            console.log(err);
            return {keyword, result : 0, time : 0};
        }
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

module.exports = googleapis;