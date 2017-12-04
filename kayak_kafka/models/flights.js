var mongoose = require('mongoose');
var mysql = require('./mysql');

var flightSchema = mongoose.Schema({
    flight_id:{type:String, required:true},
    flight_carrier_name:{type:String, required : true},
    flight_src_city :{type : String, required : true},
    flight_destination_city :{type : String, required : true},
    flight_duration : {type : Number, required : true},
    flight_operational_day : {type : Number, required : true},
    flight_departure_time : {type : String, required : true},
    flight_price : {type  : Number, required : true},
    flight_landing_time :{type: String}
});

const Flights = mongoose.model('Flights',flightSchema);

function addNewFlight(flightDetail, callback){
    console.log("in add flight");
    flightDetail.save(callback);
}

function searchFlights(parameter, callback){
    console.log(parameter);
    console.log("in flight detail");
    Flights.find(parameter, callback);
}

function editFlight(flight_id, flightDetail, callback){
    Flights.update({ flight_id: flight_id}, {$set: flightDetail}, callback);
}

function deleteFlight(flight_id, callback){
    Flights.findOneAndRemove({flight_id:flight_id}, callback);
}

function bookFlight(flightbookdetail, callback){
    var bookFlight = "INSERT INTO flight_booking(user_id,flight_id,flight_name,flight_src_city,flight_destination_city,booking_date,booking_amount,flightfromdate,flighttodate,flight_passengers) VALUES ('" + flightbookdetail.user_id + "','" + flightbookdetail.flight_id + "','" + flightbookdetail.flight_name + "','" + flightbookdetail.flight_src_city + "','" + flightbookdetail.flight_destination_city + "','" + flightbookdetail.booking_date + "','" + flightbookdetail.booking_amount + "','" + flightbookdetail.flightfromdate + "','" + flightbookdetail.flighttodate + "','" + flightbookdetail.flight_passengers+ "')";
    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }
        else
        {
            callback(null,result);
        }
    }, bookFlight);
}

function searchFlightsAdmin(flight_id, carrier_name, callback){
    var query = {};
    if(flight_id)
        query.flight_id = flight_id;
    if(carrier_name)
        query.carrier_name = carrier_name;
    console.log("searchFlightAdmin:",query);
    Flights.find(query, callback);
}

function updateFlightAdmin(flightDetail,callback){
    Flights.update({flight_id : flightDetail.flight_id},{$set:{
        flight_carrier_name : flightDetail.flight_carrier_name,
        flight_src_city :flightDetail.flight_src_city,
        flight_destination_city :flightDetail.flight_destination_city,
        flight_duration :flightDetail.flight_duration,
        flight_operational_day :flightDetail.flight_operational_day,
        flight_departure_time :flightDetail.flight_departure_time,
        flight_price :flightDetail.flight_price
    }},callback);
}


module.exports.addNewFlight = addNewFlight;
module.exports.searchFlights = searchFlights;
module.exports.editFlight = editFlight;
module.exports.deleteFlight = deleteFlight;
module.exports.bookFlight = bookFlight;
module.exports.searchFlightsAdmin = searchFlightsAdmin;
module.exports.updateFlightAdmin = updateFlightAdmin;
module.exports.Flights = Flights;
