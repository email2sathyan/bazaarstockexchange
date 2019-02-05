const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
let data = function(url){
    
    return new Promise(function(resolve,reject){
        request(url,function(err,response,body){
            if(err){
                return {
                    status: 'Some error occured'
                }
            }
            if (response && response && response.statusCode !== 200){
                return {
                    status: 'Some error occured'
                }
            }
            var $ = cheerio.load(body);
            let bse = '' ;
            if($('span.bl_15:nth-child(1)').text() && $('span.bl_15:nth-child(1)').text().length == 3 && $('span.bl_15:nth-child(1)').text() === 'BSE'){
                bse = $('span.bl_15:nth-child(1)').text()
            }
            let nse = ''
            if($('span.bl_15:nth-child(1)').text() && $('span.bl_15:nth-child(1)').text().length == 3 && $('span.bl_15:nth-child(1)').text() === 'NSE'){
                nse = $('span.bl_15:nth-child(1)').text()
            }
            if($('span.bl_15:nth-child(1)').text() && $('span.bl_15:nth-child(1)').text().length >= 6 && $('span.bl_15:nth-child(1)').text().substring(0, 3) === 'BSE' && $('span.bl_15:nth-child(1)').text().substring(3, 6) === 'NSE'){
                bse = $('span.bl_15:nth-child(1)').text().substring(0,3);
                nse = $('span.bl_15:nth-child(1)').text().substring(3,6)
            }
            let info = {}
            if(bse){
                let time_stamp = $('div#bse_upd_time').text();
                let live_price = $('span#Bse_Prc_tick').text();
                let prev_close = $('div#b_prevclose').text(); 
                let open = $('div#b_open').text();
                let day_low = $('span#b_low_sh').text(); 
                let day_high = $('span#b_high_sh').text(); 
                let week52_low = $('span#b_52low').text(); 
                let week52_high = $('span#b_52high').text();
                
                info.bse = {
                    time_stamp,
                        live_price,
                        prev_close,
                        open,
                        day_low,
                        day_high,
                        week52_low,
                        week52_high
                }

                
            } 
            if (nse){
                let time_stamp = $('div#nse_upd_time').text();
                let live_price = $('span#Nse_Prc_tick').text();
                let prev_close = $('div#n_prevclose').text(); 
                let open = $('div#n_open').text();
                let day_low = $('span#n_low_sh').text(); 
                let day_high = $('span#n_high_sh').text(); 
                let week52_low = $('span#n_52low').text(); 
                let week52_high = $('span#n_52high').text();
                console.log(time_stamp);
                console.log(live_price);
                console.log(prev_close);
                let nsek  = {
                    time_stamp,
                        live_price,
                        prev_close,
                        open,
                        day_low,
                        day_high,
                        week52_low,
                        week52_high
                }
                console.log(nsek)
                info['nse'] = nsek;
                
            }

            resolve(info)
        })
    })
}


module.exports = data