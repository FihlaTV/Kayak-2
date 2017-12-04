var mongoose = require('mongoose');
var mysql = require('./mysql');

var hotelSchema = mongoose.Schema({
    hotel_id:{type: String, required:true},
    hotel_name:{type:String, required:true},
    hotel_address : {type : String, required : true},
    hotel_city : {type : String, required : true},
    hotel_state : {type : String, required : true},
    hotel_zip : {type : Number, required : true},
    hotel_stars : {type : Number, required : true},
    hotel_room_type : {type : String, required : true},
    hotel_rating : {type : Number, required : true},
    hotel_reviews : {type : [String]},
    hotel_capacity : {type : Number, required : true},
    hotel_start_date : {type : Date},
    hotel_end_date : {type : Date},
    hotel_price : {type : Number, required : true
    }
});

const Hotels = mongoose.model('hotels',hotelSchema);


function addNewHotel(hotelDetail, callback){
    hotelDetail.save(callback);
}

function searchHotels(parameter, callback){
    Hotels.find(parameter, callback);
}

function editHotel(hotel_id, hotelDetail, callback){
    Hotels.update({ hotel_id: hotel_id}, {$set: hotelDetail}, callback);
}

function deleteHotel(hotel_id, callback){
    Hotels.findOneAndRemove({hotel_id:hotel_id}, callback);
}

function bookHotel(hotelbookdetail, callback){
    var bookHotel = "INSERT INTO hotel_booking(user_id,hotel_city,hotel_name,hotel_id,booking_date,booking_amount,start_date,end_date) VALUES ('" + hotelbookdetail.user_id + "','" + hotelbookdetail.hotel_city + "','" + hotelbookdetail.hotel_name + "','" + hotelbookdetail.hotel_id + "','" + hotelbookdetail.booking_date + "','" + hotelbookdetail.booking_amount + "','" + hotelbookdetail.start_date + "','" + hotelbookdetail.end_date + "')";
    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }
        else
        {
            callback(null,result);
        }
    }, bookHotel);
}

function searchHotelsAdmin(hotel_id, hotel_name, callback){
    var query = {};
    if(hotel_id)
        query.hotel_id = hotel_id;
    if(hotel_name)
        query.hotel_name = hotel_name;
    console.log("searchHotel:",query);
    Hotels.find(query, callback);
}

function updateHotelAdmin(hotelDetail,callback){
    Hotels.update({hotel_id : hotelDetail.hotel_id},{$set:{
        hotel_name : hotelDetail.hotel_name,
        hotel_address :hotelDetail.hotel_address,
        hotel_city :hotelDetail.hotel_city,
        hotel_state :hotelDetail.hotel_state,
        hotel_zip :hotelDetail.hotel_zip,
        hotel_stars :hotelDetail.hotel_stars,
        hotel_room_type :hotelDetail.hotel_room_type,
        hotel_rating :hotelDetail.hotel_rating,
        hotel_reviews :hotelDetail.hotel_reviews,
        hotel_capacity :hotelDetail.hotel_capacity,
        hotel_price :hotelDetail.hotel_price
    }},callback);
}

module.exports.addNewHotel = addNewHotel;
module.exports.searchHotels = searchHotels;
module.exports.editHotel = editHotel;
module.exports.deleteHotel = deleteHotel;
module.exports.bookHotel = bookHotel;
module.exports.searchHotelsAdmin = searchHotelsAdmin;
module.exports.updateHotelAdmin = updateHotelAdmin;
module.exports.Hotels = Hotels;
