const fs = require('fs');
const cheerio = require('cheerio')
const request = require('request');
let url = "https://www.moneycontrol.com/stocks/marketstats/indexcomp.php?optex=NSE&opttopic=indexcomp&index=56"

// request('https://www.moneycontrol.com/stocks/marketstats/indexcomp.php?optex=NSE&opttopic=indexcomp&index=7',function(err,res,body){
//     let $ = cheerio.load(body)
//     $('.bdrtpg').find("tr").each(function(row){
//         if($(row).find('td').length > 0){
            
//         }
//     })
// })
let scrap =  new Promise(function(resolve,reject){
        let k = []
        request(url,function(err,response,body){
            let $ = cheerio.load(body)
            $('.tbldata14').find('tr').each(function(i,row){
                    
                    
                        let company = {}
                        if($(row).find('td:first-child > a').attr('href')!== ''){
                            company.url = $(row).find('td:first-child > a').attr('href')
                        }
                        if($(row).find('td:first-child > a').text() !== ''){
                            company.name = $(row).find('td:first-child > a').text()
                        }
                        if(company.hasOwnProperty('name') && company.hasOwnProperty('url')){
                            k.push(company)
                        }
                        
                        
                    
                
            })
            
            resolve(k)
        })
        
        
    })



// let f = function(i,callback){
//     return callback(i)
// }

//    scrap.then(function(val){
//        console.log(val)
//    }).catch()
// let newUrl  = url + String.fromCharCode(90);
// console.log(newUrl)
scrap.then(function(val){
    let file = fs.readFileSync('comp.json')
    let company = JSON.parse(file);
    
     company = company.concat(val)
     console.log(company.length)
    fs.writeFile('comp.json',JSON.stringify(company))
    
    
}).catch(function(err){})
        





