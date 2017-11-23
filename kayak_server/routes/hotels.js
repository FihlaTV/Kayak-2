var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');



    router.post('./insertHotel', function (req, res, next) {
        console.log('inside insert hotel');
        try {
            var reqObj = req.body;
            console.log(reqObj);
            kafka.make_request('insert_hotel_topic', {"HotelName" : reqObj.hName,
                "HotelCity" : reqObj.city,
                "HotelAddress" : reqObj.address,
                "PricePerNight" : reqObj.price,
                "NumberSleepsPerRoom" : reqObj. sleeps,
                "RoomsAvailable" : reqObj.rooms,
                "TotalCapacity" : reqObj.capacity
            },function (err, results) {
                console.log(results);
                if(err){
                    console.log(err);
                }
                else {
                    if(results.code == 200){
                        console.log('data inserted')
                    }
                }
            });
        }
        catch (ex){
            console.error("internal error:"+ex);
            return next(ex);
        }
    });

module.exports = router;

