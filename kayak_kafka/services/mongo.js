var mongoose = require('mongoose');

var configDB = require('./database');

mongoose.connect(configDB.url,{
    useMongoClient : true
});

var hotelSchema = mongoose.Schema({
    local: {
        HotelName : String,
        HotelCity : String,
        HotelAddress : String,
        PricePerNight : String,
        NumberSleepsPerRoom :Number,
        RoomsAvailable : Number,
        TotalCapacity : Number
    }
});

module.exports =  mongoose.model('Hotel', hotelSchema);
