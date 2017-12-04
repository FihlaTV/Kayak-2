var  Flights = require('./../models/flights');

function handleAddFlight(data, callback){
    console.log('In add flight'+ data);
    var str1= data.flight_departure_time.substr(0,2);
    console.log("str1:"+str1);
    var str2= data.flight_departure_time.substr(2,data.flight_departure_time.length-1);
    console.log("str2:"+str2);
    var x = Number(str1);
    console.log(x);
    var y = x + Number(data.flight_duration);
    console.log(y);
    var z = String(y);
    console.log(z);
    var land = z+ str2;
    console.log(land);
    var flightDetail = new Flights.Flights({
        flight_id:data.flight_id,
        flight_carrier_name:data.flight_carrier_name,
        flight_src_city:data.flight_src_city,
        flight_destination_city:data.flight_destination_city,
        flight_duration:data.flight_duration,
        flight_operational_day:data.flight_operational_day,
        flight_departure_time:data.flight_departure_time,
        flight_price:data.flight_price,
        flight_landing_time: land
    });
    Flights.addNewFlight(flightDetail, function(err, res){
        if(err){
            console.log(err);
            res ='err';
        }
        console.log(res);
        callback(err,res);
    });
}

function handleSearchFlights (data, callback){
    console.log('In search flight'+ data);
    Flights.searchFlights(data, function(err, res){
        if(err){
            console.log(err);
            res ='err';
        }
        console.log(res);
        callback(err, res);
    });
}

function handleEditFlight(data, callback){
    console.log('In edit flight'+data);
    if(data.flight_id === null){
        callback("Model is missing, failed to edit without model_no",null);
    }else{
        var flightData = {};
        if(data.flight_id)
            flightData.flight_id = data.flight_id;
        if(data.flight_carrier_name)
            flightData.flight_carrier_name = data.flight_carrier_name;
        if(data.flight_src_city)
            flightData.flight_src_city = data.flight_src_city;
        if(data.flight_destination_city)
            flightData.flight_destination_city = data.flight_destination_city;
        if(data.flight_duration)
            flightData.flight_duration = data.flight_duration;
        if(data.flight_operational_day)
            flightData.flight_operational_day = data.flight_operational_day;
        if(data.flight_departure_time)
            flightData.flight_departure_time = data.flight_departure_time;
        if(data.flight_price)
            flightData.flight_price = data.flight_price;
        Flights.editFlight(data.flight_id, flightData, function(err,res){
            if(err){
                console.log(err);
                res ='err';
            }
            console.log(res);
            callback(err, res);
        });
    }

}

function handleDeleteFlight(data, callback){
    console.log('In delete flight'+data);
    Flights.deleteFlight( data.flight_id , function(err , res){
        if(err){
            console.log("err");
            console.log(err);
            res ='err';
        }
        console.log(res);
        callback(err,res);
    });
}

function handleBookFlight (data, callback){
    var flightDetail = {
        user_id:data.user_id,
        booking_date:data.booking_date,
        booking_amount:data.booking_amount,
        flightfromdate:data.flightfromdate,
        flighttodate:data.flighttodate,
        flight_passengers:data.flight_passengers,
        flight_name:data.flight_name,
        flight_src_city:data.flight_src_city,
        flight_destination_city:data.flight_destination_city,
        flight_id:data.flight_id};
    Flights.bookFlight( flightDetail , function(err , res){
        if(err){
            console.log(err);
            res= 'err';
        }
        console.log(res);
        callback(err,res);
    });
}

module.exports.handleAddFlight = handleAddFlight;
module.exports.handleSearchFlights = handleSearchFlights;
module.exports.handleEditFlight = handleEditFlight;
module.exports.handleDeleteFlight = handleDeleteFlight;
module.exports.handleBookFlight = handleBookFlight;
