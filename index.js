const request = require("request-promise");
const cheerio = require("cheerio");
const notifier = require("node-notifier");
const config = require('./config/config.js'); 



async function main(){

    const result = await request.get(config.options);
    const $ = cheerio.load(result);
    
    //loop through table and notify me if there is free slot available
    $("#customers > tbody > tr:contains('Laughing Bacchus Winecellars'):contains('Canada')").each((index,element)=>{

        notifier.notify({
        title: 'My notification',
        message:'New slot available'
        });
        console.log($(element).text());
        // Sound alert
        console.log("\007");
    });
}

//run main every 5 minutes
const minutes = 5, the_interval=minutes*60 *100;
setInterval(function(){
    console.log("I am doing my 5 minutes check");
    main();
}, the_interval);