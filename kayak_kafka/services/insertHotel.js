var User = require('./mongo');

function handle_request(msg, callback) {
    var res = {};
    console.log("in handle request:" + JSON.stringify(msg));

    var newUser = new User();

    newUser.local.HotelName = HotelName;
    newUser.local.HotelCity = HotelCity;
    newUser.local.HotelAddress = HotelAddress;
    newUser.local.PricePerNight = PricePerNight;
    newUser.local.NumberSleepsPerRoom = NumberSleepsPerRoom;
    newUser.local.RoomsAvailable = RoomsAvailable;
    newUser.local.TotalCapacity = TotalCapacity;

    newUser.save(function (err) {
        if(err){
            throw err;
            console.log(err);
        }
        else {
            console.log("data entered");
        }
    });

}

exports.handle_request = handle_request;
