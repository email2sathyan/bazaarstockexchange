const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const request = require('request');
const express =  require('express');
const fs = require('fs')
const bseURL = require('./data/bse');
const nseURL = require('./data/nse');
const scrap = require('./scrap');
// console.log(Object.keys(bseURL).length)
// console.log(Object.keys(nseURL).length)
var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



app.post('/',function(req,res){

    let bse = req.body.bse || '';
    let nse = req.body.nse || '';
    if(!bseURL[bse] && !nseURL[nse]){
        res.send({
            staus: "This copmany is not listed in BSE and NSE"
        })
    }

    if(bseURL[bse] && bseURL[bse].url.length > 2){
        scrap(bseURL[bse].url)
        .then(function(info){
            console.log(info)
            res.send(info)
        })
        .catch()
        
    } 
    else if (nseURL[nse] && nseURL[nse].url.length > 2){
        scrap(nseURL[nse].url)
        .then(function(info){
            console.log(info)
            res.send(info)
        })
        .catch()
        
    }
})

app.listen(3000,function(){
    console.log('server is running at port 3000');

});