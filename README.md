# Nodejs_web_scraper
Simple web scraper to fetch the HTML source code of the website through an HTTP request.

Web scraping refers to the process of gathering information from a website through automated scripts. This eases the process of gathering large amounts of data from websites where no official API has been defined.

The script is created with purpose of notification when fee slot for system reservation is available. Every 5 minutes sript is scaping HTML table, if conditions are met, notification module will alert user.

## Prerequisities
You will need to have Node.js and [npm](https://www.npmjs.com/get-npm) installed on your computer. This [page](https://www.npmjs.com/get-npm) contains instructions on how to install or upgrade your Node installation to the latest version.

## Getting started
Create a new  directory for this tutorial and initialize it with a package.json file by running npm init -y from the project root.

Next, install the dependencies that we'll be needing too build up the web scraper:

`npm install request-promise cheerio node-notifier --save`

#### Here's what each one does:

Request-promise: The simplified HTTP request client 'request' with Promise support. Powered by Bluebird.

[Cheerio](https://cheerio.js.org/): jQuery implementation for Node.js. Cheerio makes it easy to select, edit, and view DOM elements.

[Node-notifier](https://www.npmjs.com/package/node-notifier): cross platform native notifications using Node.js

### Scrap a website with Cheerio
To demonstrate how you can scrape a website using Node.js, we're going to set up a script to scrape the w3schools website for some table rows.

First create new folder Config and config.js file inside it. There we will keep our HTML link, and credetials if needed.
Go to the [w3schools](https://www.w3schools.com/html/html_tables.asp) and open the dev tools on that page (CTRL + SHIFT +I).
Use the inspector tool to highlight the body of the table. 
As you can see the table body has a class of ".tbody". You can right click on the table and "copy selector". you should have something like:
'#customers > tbody' 
We can select all the rows using cheerio like this: $('.#customers > tbody > tr'). 

Create a new index.js file in the root of your project directory and populate it with the following code:

    async function main()

    const result = await request.get(config.options);
    const $ = cheerio.load(result);
    
    //loop through table and notify me if there is a free slot available. Lets imagine that we are looking for row which contains 'Laughing Bacchus Winecellars' and 'Canada' instead 'Free slot' and 'Make reservation'
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
    
Now we have to call our main() function every 5 minutes
   
    const minutes = 5, the_interval=minutes*60 *100;
    setInterval(function(){
        console.log("I am doing my 5 minutes check");
        main();
    }, the_interval);

## Wrap up
In this tutorial, we learned how to set up web scraping in Node.js. We looked at scraping methods, so you should have no issues scraping data off of any website you desire.

