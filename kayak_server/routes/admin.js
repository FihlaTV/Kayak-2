var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');
var utils = require('./../util/utils');
var jwt = require('jsonwebtoken');

router.post('/adminsignup', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    let admininfo ={};
    admininfo.username = username;
    admininfo.password = password;
    kafka.make_request('admin_signup', admininfo, function(err , results){
        if(err){
            console.log("error in signing up admin");
        }
        else{
            if(result.status == 201){
                res.send(201).json({result : result});
            }
            else if(result.status == 401){
                res.send(401).json({message : "Admin already exists"});
            }
        }
    });

});

router.post('/adminsignin', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var admininfo ={};
    admininfo.username = username;
    admininfo.password = password;
    kafka.make_request('admin_signin', admininfo, function(err , results){
        if(err){
            console.log("error in signing in as admin");
            res.status(401).json({result : {}, message:"Failed to login in kafka error: "+err});
        }
        else{
            console.log("result: ",results);
            if(results.status == 201){
                let userinfo ={};
                userinfo.username = username;
                userinfo.type = "admin";
                const server_token = jwt.sign({uid:username},utils.server_secret_key);
                res.status(201).json({result : {userinfo:userinfo,servertoken:server_token}, message:"Admin Signed in successfully"});
            }else{
                res.status(401).json({result : results.result, message:results.message});
            }
        }
    });
});


router.post('/adminhotelbilling', function(req, res, next) {
    console.log(req.body);
    var where_clause =  '';
    if( req.body.date){
        where_clause += "where Date(booking_date) = "+"'"+req.body.date+"'";
    }else if(req.body.month){
        var date = new Date();
        var year = date.getFullYear();
        var start_d = year+"-"+req.body.month+"-"+01;
        var end_d = year+"-"+req.body.month+"-"+31;
        where_clause += "where Date(booking_date) between '"+start_d+"' and '"+end_d+"'";
    }else{
        res.status(403).json({result:[],message:"Please select either month or date to get billing information"});
    }
    if(where_clause){
        var flightbilling="select * from hotel_booking "+where_clause;
        kafka.make_request('admin_hotelBillingInfo', {query : flightbilling}, function(err,result){

            if(err){
                console.log(err);
                res.status(403).json({result:[],message:err});
            }else {
                res.status(201).json({result:result,message:"Successfully retrieved flight billing information"});
            }
        });
    }
});


router.post('/searchhotelsadmin', function(req, res, next) {
    console.log("In search hotels admin");

    var hotel_id = req.body.hotel_id;
    var hotel_name = req.body.hotel_name;

    kafka.make_request('admin_searchHotel',{"hotel_id" : hotel_id , "hotel_name" : hotel_name}, function(err,result){
        if(err){
            console.log("error in searching hotels");
            res.status(403).json({result:result,message:"Admin Failed to search hotel with id :"+hotel_id});
        }
        else{
            console.log("hotel search successful");
            res.status(201).json({result:result,message:"Admin Sucessfully searched hotel with id :"+hotel_id});
        }
    });
});


router.post('/updatehoteladmin', function(req, res, next) {
    console.log("In update hotels");
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


    kafka.make_request('admin_updateHotel', hotelDetail , function(err,result){
        if(err){
            console.log("error in updating hotel");
            res.status(403).json({result:result,message:"Failed to add hotel :"+ hotelDetail.hotel_name});
        }
        else{
            res.status(201).json({result:result,message:"Sucessfully updated hotel :"+hotelDetail.hotel_name});
        }
    });
});

router.post('/deletecar', function(req, res, next) {
    var cardetail = {
        car_model_no:req.body.car_model_no
    };
    kafka.make_request('delete_car',cardetail, function(err,result){
        if(err){
            console.log("[Node Server] Error deleteing car, error: ",err);
            res.status(403).json({message:"Failed to delete car: "+cardetail.car_model_no+" try again!!!"})
        }
        else{
            res.status(201).json({result:result,message:"successfully deleted car: "+cardetail.car_model_no});
        }
    });
});


router.post('/searchcarsadmin', function(req, res, next) {
    console.log("In search cars admin");

    var car_model_no = req.body.car_model_no;
    var car_name = req.body.car_name;

    kafka.make_request('admin_searchCar',{"car_model_no" : car_model_no , "car_name" : car_name}, function(err,result){
        if(err){
            console.log("error in searching cars");
            res.status(403).json({result:result,message:"Admin Failed to search car with id :"+car_model_no});
        }
        else{
            console.log("car search successful");
            res.status(201).json({result:result,message:"Admin Sucessfully searched car with id :"+car_model_no});
        }
    });
});

router.post('/updatecaradmin', function(req, res, next) {
    console.log("In update cars");
    var carDetail = {
        car_model_no : req.body.car_model_no,
        car_capacity : req.body.car_capacity,
        car_no_of_bags : req.body.car_no_of_bags,
        car_name : req.body.car_name,
        car_no_of_doors : req.body.car_no_of_doors,
        car_price : req.body.car_price,
        car_src_city :req.body.car_src_city,
        car_destination_city : req.body.car_destination_city,
        car_rental_agency : req.body.car_rental_agency,
        car_type : req.body.car_type
    };


    kafka.make_request('admin_updateCar', carDetail , function(err,result){
        if(err){
            console.log("error in updating car");
            res.status(403).json({result:result,message:"Failed to add hotel :"+ carDetail.model_no});
        }
        else{
            res.status(201).json({result:result,message:"Sucessfully updated car :"+carDetail.model_no});
        }
    });
});

router.post('/searchflightsadmin', function(req, res, next) {
    console.log("In search flights admin");

    var flight_id = req.body.flight_id;
    var carrier_name = req.body.carrier_name;

    kafka.make_request('admin_searchFlight',{"flight_id" : flight_id , "carrier_name" : carrier_name}, function(err,result){
        if(err){
            console.log("error in searching flights");
            res.status(403).json({result:result,message:"Admin Failed to search flight with id :"+flight_id});
        }
        else{
            console.log("flight search successful");
            res.status(201).json({result:result,message:"Admin Sucessfully searched flight with id :"+flight_id});
        }
    });
});

router.post('/updateflightadmin', function(req, res, next) {
    console.log("In update flight");
    var flightDetail = {
        flight_id : req.body.flight_id,
        flight_carrier_name : req.body.flight_carrier_name,
        flight_src_city : req.body.flight_src_city,
        flight_destination_city : req.body.flight_destination_city,
        flight_duration : req.body.flight_duration,
        flight_operational_day : req.body.flight_operational_day,
        flight_departure_time :req.body.flight_departure_time,
        flight_price : req.body.flight_price
    };


    kafka.make_request('admin_updateFLight', flightDetail , function(err,result){
        if(err){
            console.log("error in updating flight");
            res.status(403).json({result:result,message:"Failed to update flight :"+ flightDetail.flight_id});
        }
        else{
            res.status(201).json({result:result,message:"Sucessfully updated flight :"+flightDetail.flight_id});
        }
    });
});



router.post('/admincarbilling', function(req, res, next) {
    //Date format YYYY-MM-DD
    var where_clause =  '';
    if( req.body.date){
        where_clause += "where Date(booking_date) = "+"'"+req.body.date+"'";
    }else if(req.body.month){
        var date = new Date();
        var year = date.getFullYear();
        var start_d = year+"-"+req.body.month+"-"+01;
        var end_d = year+"-"+(Number(req.body.month))+"-"+31;
        where_clause += "where Date(booking_date) between '"+start_d+"' and '"+end_d+"'";
    }else{
        res.status(403).json({result:[],message:"Please select either month or date to get billing information"});
    }
    if(where_clause){
        var carbilling="select * from car_booking "+where_clause;
        kafka.make_request('admin_carBillingInfo', {query : carbilling}, function(err,result){

            if(err){
                console.log(err);
                res.status(403).json({result:[],message:err});
            }else {
                res.status(201).json({result:result,message:"Successfully retrieved car billing information"});
            }
        });
    }

});

router.post('/adminflightbilling', function(req, res, next) {
    //Date format YYYY-MM-DD
    console.log(req.body);
    var where_clause =  '';
    if( req.body.date){
        where_clause += "where Date(booking_date) = "+"'"+req.body.date+"'";
    }else if(req.body.month){
        var date = new Date();
        var year = date.getFullYear();
        var start_d = year+"-"+req.body.month+"-"+01;
        var end_d = year+"-"+req.body.month+"-"+31;
        where_clause += "where Date(booking_date) between '"+start_d+"' and '"+end_d+"'";
    }else{
        res.status(403).json({result:[],message:"Please select either month or date to get billing information"});
    }
    if(where_clause){
        var flightbilling="select * from flight_booking "+where_clause;
        kafka.make_request('admin_flightBillingInfo', {query : flightbilling}, function(err,result){

            if(err){
                console.log(err);
                res.status(403).json({result:[],message:err});
            }else {
                res.status(201).json({result:result,message:"Successfully retrieved flight billing information"});
            }
        });
    }
});

router.post('/getadminprofile',function(req, res, next){
    var admininfo = {};
    admininfo.username = req.body.username;

    kafka.make_request('admin_details', admininfo , function(err,result){
        if(!err){
            console.log('result*****',result);
            //console.log("user signed up ",result);
            if(result.code === 201){
                res.status(201).json({result:result});
            }
        }else{
            res.status(401).json({result:[]});
        }
    });
});

router.post('/updateadmindetails',function(req, res, next){
    var admininfo = {};
    admininfo.username = req.body.username;
    admininfo.password = req.body.password;
    admininfo.first_name = req.body.first_name;
    admininfo.last_name = req.body.last_name;
    admininfo.address = req.body.address;
    admininfo.city = req.body.city;
    admininfo.zip = req.body.zip;
    admininfo.state = req.body.state;
    admininfo.phone = req.body.phone;

    console.log("admininfo: " , admininfo);

    kafka.make_request('update_admin', admininfo , function(err,result){
        if(!err){
            console.log('result*****',result);
            //console.log("user signed up ",result);
            if(result.code === 201){
                res.status(201).json(result);
            }
        }else{
            res.status(401).json({});
        }
    });
});




module.exports = router;
