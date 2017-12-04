// var mongoose = require('mongoose');
// mongoose.connect('localhost:27017/kayak',{ server: { poolSize: 100}});
// var Schema = mongoose.Schema;
//
// var flightDataSchema = new Schema({
//     flightName             : String,
//     source                 : String,
//     destination            : String,
//     timeTakeOff            : Date,
//     timeLand               : Date,
//     duration               : String,
//     economyCapacity        : Number,
//     premiumEconomyCapacity : Number,
//     businessCapacity       : Number,
//     firstCapacity          : Number,
//     economyPrice           : String,
//     premiumEconomyPrice    : String,
//     businessPrice          : String,
//     firstPrice             : String
// });
//
// var hotelDataSchema = new Schema({
//
//         HotelName : String,
//         HotelCity : String,
//         HotelAddress : String,
//         PricePerNight : Number,
//         NumberSleepsPerRoom :Number,
//         RoomsAvailable : Number,
//         TotalCapacity : Number
// });
//
// var carDataSchema = mongoose.Schema({
//         CarType : String,
//         CarClass : String,
//         CarStart : String,
//         CarEnd : String,
//         CarRentPerDay : Number,
//         CarSits : Number,
//         CarBags : Number
//
// });
//
//
// module.exports.FlightData = mongoose.model('FlightData', flightDataSchema);
// module.exports.HotelData = mongoose.model('HotelData', hotelDataSchema);
// module.exports.CarData = mongoose.model('CarData', carDataSchema);
//
