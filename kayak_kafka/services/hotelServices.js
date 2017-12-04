var Hotels = require('../models/hotels');


function handleAddHotel(data, callback){
    console.log('In add hotel'+ data);
    var hotelDetail = new Hotels.Hotels({
        hotel_id: data.hotel_id,
        hotel_name : data.hotel_name ,
        hotel_address : data.hotel_address,
        hotel_city : data.hotel_city,
        hotel_state : data.hotel_state,
        hotel_zip : data.hotel_zip ,
        hotel_stars : data.hotel_stars,
        hotel_room_type : data.hotel_room_type,
        hotel_rating : data.hotel_rating,
        hotel_reviews : data.hotel_reviews,
        hotel_capacity : data.hotel_capacity,
        hotel_price : data.hotel_price
    });
    Hotels.addNewHotel(hotelDetail, function(err , res){
        if(err){
            console.log(err);
            res ='err';
        }
        console.log(res);
        callback(err,res);
    });
}

function handleSearchHotels(data, callback){
    console.log('In search hotel'+ data);
    var query ={
        "hotel_city": data.hotel_city,
        "hotel_capacity": {$gt: data.hotel_capacity}
    };
    Hotels.searchHotels( query,  function(err , res){
        console.log("result is" + res);
        if(err){
            console.log(err);
            res ='err';
        }
        console.log(res);
        callback(err,res);
    });
}

function handleEditHotel(data, callback){
    console.log('In edit hotel'+data);
    if(!data.hotel_id){
        callback("Model is missing, failed to edit without model_no",null);
    }else{
        var hotelData = {};
        if(data.hotel_id)
            hotelData.hotel_id = data.hotel_id;
        if(data.hotel_name)
            hotelData.hotel_name = data.hotel_name;
        if(data.hotel_address)
            hotelData.hotel_address = data.hotel_address;
        if(data.hotel_city)
            hotelData.hotel_city = data.hotel_city;
        if(data.hotel_state)
            hotelData.hotel_state = data.hotel_state;
        if(data.hotel_zip)
            hotelData.hotel_zip = data.hotel_zip;
        if(data.hotel_stars)
            hotelData.hotel_stars = data.hotel_stars;
        if(data.hotel_room_type)
            hotelData.hotel_room_type = data.hotel_room_type;
        if(data.hotel_rating)
            hotelData.hotel_rating = data.hotel_rating;
        if(data.hotel_reviews)
            hotelData.hotel_reviews = data.hotel_reviews;
        if(data.hotel_capacity)
            hotelData.hotel_capacity = data.hotel_capacity;
        if(data.hotel_start_date)
            hotelData.hotel_start_date = data.hotel_start_date;
        if(data.hotel_end_date)
            hotelData.hotel_end_date = data.hotel_end_date;
        if(data.hotel_price)
            hotelData.hotel_price = data.hotel_price;
        Hotels.editHotel(data.hotel_id, hotelData, function(err,res){
            if(err){
                console.log(err);
                res ='err';
            }
            console.log(res);
            callback(err, res);
        });
    }

}

function handleDeleteHotel(data, callback){
    console.log('In delete hotel'+data);
    Hotels.deleteHotel( data.hotel_id , function(err , res){
        if(err){
            console.log(err);
            res ='err';
        }
        console.log(res);
        callback(err,res);
    });
}

function handleBookHotel (data, callback){
    var hotelDetail = {
        user_id:data.user_id,
        booking_date:data.booking_date,
        booking_amount:data.booking_amount,
        start_date:data.start_date,
        end_date:data.end_date,
        hotel_name:data.hotel_name,
        hotel_city:data.hotel_city,
        hotel_id:data.hotel_id};
    Hotels.bookHotel( hotelDetail , function(err , res){
        if(err){
            console.log(err);
            res='err';
        }
        console.log(res);
        callback(err,res);
    });
}


module.exports.handleAddHotel = handleAddHotel;
module.exports.handleSearchHotels = handleSearchHotels;
module.exports.handleEditHotel = handleEditHotel;
module.exports.handleDeleteHotel = handleDeleteHotel;
module.exports.handleBookHotel = handleBookHotel;
