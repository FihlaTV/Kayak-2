var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var moment = require('moment');
var math = require('mathjs');
var mysql= require('./mysql');
var url = require('url');


// router.use(fileUpload({preserveExtension:true}));

function stringToDate(s) {
    var dateParts = s.split(' ')[0].split('-');
    var timeParts = s.split(' ')[1].split(':');
    var d = new Date(dateParts[0], --dateParts[1], dateParts[2]);
    d.setHours(timeParts[0], timeParts[1], timeParts[2])

    return d
}

function dhm(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
    if( m === 60 ){
        h++;
        m = 0;
    }
    if( h === 24 ){
        d++;
        h = 0;
    }
    return [d, pad(h), pad(m)].join(':');
}

router.post('/api/add', function (req, res) {
    console.log('add flight is being called');
    console.log(req.body);
    var flightName= req.body.flightName;
    var timeTakeOff= req.body.timeTakeOff;
    var timeLand= req.body.timeLand;
    var durationMSec = stringToDate(timeLand) - stringToDate(timeTakeOff);
    var duration = dhm(durationMSec);
    var price = req.body.price;
    var source = req.body.source;
    var destination= req.body.destination;
    var economyCapacity= req.body.economyCapacity;
    var premiumEconomyCapacity= req.body.premiumEconomyCapacity;
    var businessCapacity= req.body.businessCapacity;
    var firstCapacity=req.body.firstCapacity;
    console.log(flightName);
    console.log(timeTakeOff);
    console.log(timeLand);
    console.log("duration");
    console.log(duration);
    console.log(price);
    console.log(source);
    console.log(destination);
    console.log(economyCapacity);
    console.log(premiumEconomyCapacity);
    console.log(businessCapacity);
    console.log(firstCapacity);
    kafka.make_request('addFlight_topic', {"flightName":flightName, "timeTakeOff": timeTakeOff, "timeLand": timeLand, "duration": duration, "price": price, "source": source, "destination": destination, "economyCapacity": economyCapacity, "premiumEconomyCapacity": premiumEconomyCapacity, "businessCapacity": businessCapacity, "firstCapacity": firstCapacity}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            throw err;
            return;
        }
        else {
            if(results.code==='204'){
                res.send({status: 204,message:"Flight Added Successfully!!"});
            }
            else{
                res.send({status: 408,message:"Issue with the entry!!"});
            }

        }
    });
});


router.get('/api/getFlights', function (req, res) {
    console.log('get flights is being called');
    try{
        var query = url.parse(req.url,true).query;
        console.log(query);
        var source = query.source;
        var destination = query.destination;
        var way = query.way;
        var takeOffDate = query.takeOffDate;
        var returnDate = query.returnDate;
        var pEconomy = query.pEconomy;
        var pPremiumEconomy = query.pPremiumEconomy;
        var pBusiness = query.pBusiness;
        var pFirst = query.pFirst;
        kafka.make_request('searchFlight_topic', {"source":source, "destination": destination, "way": way, "takeOffDate": takeOffDate, "returnDate": returnDate, "pEconomy": pEconomy, "pPremiumEconomy": pPremiumEconomy, "pBusiness": pBusiness, "pFirst": pFirst}, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                throw err;
                return;
            }
            else {
                res.send(results.value);
            }
        });



    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }

});



module.exports = router;
