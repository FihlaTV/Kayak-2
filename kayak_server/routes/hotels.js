var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');

router.post('/addHotel', function(req, res, next) {
    console.log("In add hotels");
    var hotelDetail = {
        hotel_id : req.body.hotel_id,
        hotel_name : req.body.hotel_name,
        hotel_address : req.body.hotel_address,
        hotel_city : req.body.hotel_city,
        hotel_state : req.body.hotel_state,
        hotel_zip : req.body.hotel_zip,
        hotel_stars :req.body.hotel_stars,
        hotel_room_type : req.body.hotel_room_type,
        hotel_rating : req.body.hotel_rating,
        hotel_reviews : req.body.hotel_reviews,
        hotel_capacity : req.body.hotel_capacity,
        hotel_price : req.body.hotel_price
    };
    kafka.make_request('add_hotel', hotelDetail , function(err,result){
        if(err){
            console.log(err);
        }
        else{
            if(result === 'err'){
                res.send({status:408,message:"Oopss!! Failed to add hotel: "+hotelDetail.hotel_id+"..Try again!!!"})
            }
            else{
                res.send({status:204,result:result,message:"Hotel "+hotelDetail.hotel_id +" added successfully:"});
            }
        }
    });
});

router.post('/searchHotels', function(req, res, next) {
    console.log("In search hotels");
    var hotelDetail = {
        "hotel_city": req.body.hotel_city,
        "hotel_capacity": req.body.hotel_capacity
    };
    kafka.make_request('search_hotel', hotelDetail, function (err, result) {
        if(err){
            console.log(err);

        }
        else{
            if(result === 'err'){
                res.status(404).json({message:"Oopss!! Failed to find hotel in: "+hotelDetail.hotel_city+"..Try again!!!"});
            }
            else if( result.length === 0){
                res.status(404).json({message:"Oopss!! Failed to find hotel in: "+hotelDetail.hotel_city+"..Try again!!!"});
            }
            else{
                res.send({status:200,result:result});
            }
        }
    });
});

router.post('/editHotel', function(req, res, next) {
    var hotelDetail = {
        hotel_id:req.body.hotel_id,
        hotel_name:req.body.hotel_name,
        hotel_address:req.body.hotel_address,
        hotel_city:req.body.hotel_city,
        hotel_state:req.body.hotel_state,
        hotel_zip:req.body.hotel_zip,
        hotel_stars:req.body.hotel_stars,
        hotel_room_type:req.body.hotel_room_type,
        hotel_rating:req.body.hotel_rating,
        hotel_reviews:req.body.hotel_reviews,
        hotel_capacity:req.body.hotel_capacity,
        hotel_price:req.body.hotel_price
    };
    kafka.make_request('edit_hotel', hotelDetail, function(err,result){
        if(err){
            console.log(err);

        }
        else{
            if(result === 'err'){
                res.send({status:408,message:"Oopss!! Failed to edit hotel: "+hotelDetail.hotel_id+" try again!!!"})
            }
            else if( result === null || result.nModified === 0){
                res.send({status:408,message:"Oopss!! Failed to edit hotel: "+hotelDetail.hotel_id+" try again!!!"})
            }
            else {
                res.send({status:200,message:"Hotel "+hotelDetail.hotel_id+ " edited succesfully!!"});
            }
        }
    });
});

router.post('/deleteHotel', function(req, res, next) {
    console.log(req.body);
    var hotelDetail = {
        hotel_id:req.body.hotel_id
    };
    kafka.make_request('delete_hotel', hotelDetail, function(err,result){
        if(err){
            console.log(err);

        }
        else{
            if(result === 'err'){
                res.send({status:408,message:"Oopss!! Failed to delete hotel: "+hotelDetail.hotel_id+"..Try again!!!"})
            }
            else if( result === null){
                res.send({status:408,message:"Oopss!! Failed to delete hotel: "+hotelDetail.hotel_id+"..Try again!!!"})
            }
            else {
                res.send({status:200,message:"Hotel "+hotelDetail.hotel_id +" deleted succesfully!!"});
            }
        }
    });
});

router.post('/bookHotel', function(req, res, next) {
    var hotelDetail = {
        user_id:req.body.user_id,
        booking_date:req.body.booking_date,
        booking_amount:req.body.booking_amount,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        hotel_name:req.body.hotel_name,
        hotel_city:req.body.hotel_city,
        hotel_id:req.body.hotel_id
    };
    kafka.make_request('book_hotel',hotelDetail, function(err,result){
        if(err){
            console.log(err);
            res.status(408).json({message:"Failed to book a hotel: "+hotelDetail.hotel_name+" try again!!!"})
        }
        else{
            res.status(200).json({result:result,message:"successfully booked hotel:"+hotelDetail.hotel_name});
        }
    });
});


module.exports = router;
