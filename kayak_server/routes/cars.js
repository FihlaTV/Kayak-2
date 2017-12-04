var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');

router.post('/addCar', function(req, res, next) {
    console.log("addCar data: "+req.body);
    var carDetail = {
        car_model_no:req.body.car_model_no,
        car_name:req.body.car_name,
        car_capacity:req.body.car_capacity,
        car_no_of_bags:req.body.car_no_of_bags,
        car_no_of_doors:req.body.car_no_of_doors,
        car_price:req.body.car_price,
        car_src_city:req.body.car_src_city,
        car_destination_city:req.body.car_destination_city,
        car_rental_agency:req.body.car_rental_agency,
        car_type:req.body.car_type
    };
    kafka.make_request('add_car',carDetail, function(err,result){
        if(err){
            console.log(err);

        }
        else{
            if(result === 'err'){
                res.send({status:408,message:"Oopss!! Failed to add car: "+carDetail.car_name+"..Try again!!!"})
            }
            else if( result.length === 0){
                res.send({status:408,message:"Oopss!! Failed to add car: "+carDetail.car_name+"..Try again!!!"})
            }
            else {
                res.send({status:204,result:result,message:"Car "+carDetail.car_name +" added successfully:"});
            }

        }
    });
});

router.post('/searchCars', function(req, res, next) {
    console.log("searchCars data: "+req.body);
    var carDetail = {
        car_src_city : req.body.car_src_city ,
        car_destination_city : req.body.car_destination_city
    };
    kafka.make_request('search_car',carDetail, function(err,result){
        if(err){
            console.log(err);
        }
        else{
            if(result === 'err'){
                res.status(404).json({message:"Oopss!! Failed to find car from: "+carDetail.car_src_city+"..Try again!!!"});
            }
            else if( result.length === 0){
                res.status(404).json({message:"Oopss!! Failed to find car from: "+carDetail.car_src_city+"..Try again!!!"});
            }
            else {
                res.send({status:200,result:result});
            }
        }
    });
});

router.post('/editCar', function(req, res, next) {
    var carDetail = {
        car_model_no:req.body.car_model_no,
        car_name:req.body.car_name,
        car_capacity:req.body.car_capacity,
        car_no_of_bags:req.body.car_no_of_bags,
        car_no_of_doors:req.body.car_no_of_doors,
        car_price:req.body.car_price,
        car_src_city:req.body.car_src_city,
        car_destination_city:req.body.car_destination_city,
        car_rental_agency:req.body.car_rental_agency,
        car_type:req.body.car_type
    };
    kafka.make_request('edit_car',carDetail, function(err,result){
        if(err){
            console.log(err);
        }
        else{
            if(result === 'err'){
                res.send({status:408,message:"Oopss!! Failed to edit car: "+carDetail.car_model_no+" try again!!!"})
            }
            else if( result === null || result.nModified === 0){
                res.send({status:408,message:"Oopss!! Failed to edit car: "+carDetail.car_model_no+" try again!!!"})
            }
            else {
                res.send({status:200,message:"Car "+carDetail.car_model_no+ " edited succesfully!!"});
            }
        }
    });
});

router.post('/deleteCar', function(req, res, next) {
    var carDetail = {
        car_model_no:req.body.car_model_no
    };
    kafka.make_request('delete_car',carDetail, function(err,result){
        if(err){
            console.log(err);
        }
        else{
            if(result === 'err'){
                res.send({status:408,message:"Oopss!! Failed to delete car: "+carDetail.car_model_no+"..Try again!!!"})
            }
            else if( result === null){
                res.send({status:408,message:"Oopss!! Failed to delete car: "+carDetail.car_model_no+"..Try again!!!"})
            }
            else {
                res.send({status:200,message:"Car "+carDetail.car_model_no +" deleted succesfully!!"});
            }
        }
    });
});

router.post('/bookCar', function(req, res, next) {
    console.log("bookcar data: ",req.body);
    var carDetail = {
        user_id:req.body.user_id,
        booking_date:req.body.booking_date,
        booking_amount:req.body.booking_amount,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        car_name:req.body.car_name,
        car_src_city:req.body.car_src_city,
        car_destination_city:req.body.car_destination_city,
        car_rental_agency:req.body.car_rental_agency
    };
    kafka.make_request('book_car',carDetail, function(err,result){
        if(err){
            console.log(err);
            res.status(408).json({message:"Failed to book a car: "+carDetail.car_name+" try again!!!"})
        }
        else{
            res.status(200).json({result:result,message:"successfully booked car:"+carDetail.car_name});
        }
    });
});

module.exports = router;
