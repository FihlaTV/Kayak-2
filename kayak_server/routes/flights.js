var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');

router.post('/addFlight', function(req, res, next) {
    var flightDetail = {
        flight_id:req.body.flight_id,
        flight_carrier_name:req.body.flight_carrier_name,
        flight_src_city:req.body.flight_src_city,
        flight_destination_city:req.body.flight_destination_city,
        flight_duration:req.body.flight_duration,
        flight_operational_day:req.body.flight_operational_day,
        flight_departure_time:req.body.flight_departure_time,
        flight_price:req.body.flight_price
    };
    kafka.make_request('add_flight', flightDetail, function(err,result){
        console.log("in result");
        if(err){
            console.log(err);
        }
        else{
            if(result === 'err'){
                res.send({status:408,message:"Oopss!! Failed to add flight: "+flightDetail.flight_id+"..Try again!!!"})
            }
            else{
                res.send({status:204,result:result,message:"Flight "+flightDetail.flight_id +" added successfully:"});
            }
        }
    });
});

router.post('/searchFlights', function(req, res, next) {
    console.log(req.body.flight_start_date);
    var d = new Date(req.body.flight_start_date);
    d.setHours(d.getHours() + 8);
    console.log("newD is"+d);
    var day = d.getDay();
    console.log("its date in body"+d+"day"+day);
    var flightDetail = {
        "flight_src_city": req.body.flight_src_city,
        "flight_destination_city":req.body.flight_destination_city,
        "flight_operational_day":day
    };
    kafka.make_request('search_flight',flightDetail, function(err,result){
        if(err){
            console.log(err);

        }
        else{
            console.log("Result:"+result.length);
            if(result === 'err'){
                res.status(404).json({message:"Oopss!! Failed to find flight on required day..Try again!!!"});
            }
            if( result.length === 0){
                res.status(404).json({message:"Oopss!! Failed to find flight on required day..Try again!!!"});
            }
            else {
                res.send({status:200,result:result});
            }
        }
    });
});

router.post('/editFlight', function(req, res, next) {
    var flightDetail = {
        flight_id:req.body.flight_id,
        flight_carrier_name:req.body.flight_carrier_name,
        flight_src_city:req.body.flight_src_city,
        flight_destination_city:req.body.flight_destination_city,
        flight_duration:req.body.flight_duration,
        flight_operational_day:req.body.flight_operational_day,
        flight_departure_time:req.body.flight_departure_time,
        flight_price:req.body.flight_price
    };
    kafka.make_request('edit_flight', flightDetail, function(err,result){
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            if(result === 'err'){
                res.send({status:408,message:"Oopss!! Failed to edit flight: "+flightDetail.flight_id+" try again!!!"})
            }
            else if( result === null || result.nModified === 0){
                res.send({status:408,message:"Oopss!! Failed to edit flight: "+flightDetail.flight_id+" try again!!!"})
            }
            else {
                res.send({status:200,message:"Flight "+flightDetail.flight_id+ " edited succesfully!!"});
            }
        }
    });
});

router.post('/deleteFlight', function(req, res, next) {
    console.log(req.body);
    var flightDetail = {
        flight_id:req.body.flight_id
    };
    kafka.make_request('delete_flight', flightDetail, function(err,result){
        if(err){
            console.log(err);
        }
        else{
            if(result === 'err'){
                res.send({status:408,message:"Oopss!! Failed to delete flight: "+flightDetail.flight_id+"..Try again!!!"})
            }
            else if( result === null){
                res.send({status:408,message:"Oopss!! Failed to delete flight: "+flightDetail.flight_id+"..Try again!!!"})
            }
            else {
                res.send({status:200,message:"Flight "+flightDetail.flight_id +" deleted succesfully!!"});
            }
        }
    });
});

router.post('/bookFlight', function(req, res, next) {
    var flightDetail = {
        user_id:req.body.user_id,
        booking_date:req.body.booking_date,
        booking_amount:req.body.booking_amount,
        flightfromdate:req.body.flightfromdate,
        flighttodate:req.body.flighttodate,
        flight_passengers: req.body.flight_passengers,
        flight_name:req.body.flight_name,
        flight_src_city:req.body.flight_src_city,
        flight_destination_city:req.body.flight_destination_city,
        flight_id:req.body.flight_id
    };
    kafka.make_request('book_flight',flightDetail, function(err,result){
        if(err){
            console.log(err);
            res.status(408).json({message:"Failed to book a flight: "+flightDetail.flight_name+" try again!!!"})
        }
        else{
            res.status(200).json({result:result,message:"successfully booked flight:"+flightDetail.flight_name});
        }
    });
});




module.exports = router;
