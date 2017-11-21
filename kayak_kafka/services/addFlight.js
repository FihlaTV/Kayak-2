var mysql = require('./mysql');


function handle_request(msg, callback) {
    var res = {};
    console.log("In handle addFlight request:" + JSON.stringify(msg));
    var insertFlight= "insert into flights (flightId, flightName, timeTakeOff, timeLand, duration, price, source, destination, economyCapacity, premiumEconomyCapacity, businessCapacity, firstCapacity) values (DEFAULT ,'" + msg.flightName + "','" + msg.timeTakeOff + "','"+ msg.timeLand + "','" + msg.duration +"','"+ msg.price +"','"+ msg.source +"','"+ msg.destination +"','"+ msg.economyCapacity +"','"+ msg.premiumEconomyCapacity +"','"+ msg.businessCapacity +"','"+ msg.firstCapacity+ "');";
    console.log(insertFlight);
    mysql.insertData(function(err,results){
            if(err){
                console.log(err);
                res.code='500';
                res.value='Issue with the entry!!';
            }
            else {
                res.code='204';
                res.value='Flight added successfully!!';
            }
        callback(null, res);
        },insertFlight);

}

exports.handle_request = handle_request;