var mysql = require('./mysql');


function handle_request(msg, callback) {
    var res = {};
    console.log("In handle searchFlight request:" + JSON.stringify(msg));
    var searchFlight= "select * from flights where source ='" + msg.source + "' and destination = '"+ msg.destination + "';";
    console.log(searchFlight);
    mysql.fetchData(function(err,results){
        console.log(results);
        console.log(results.length);
        if(err){
            console.log(err);
            res.code='500';
        }
        else {
            if(results.length == 0 ){
                res.code='404';
                res.value="No flights found";
            }
            else{
                res.code='200';
                res.value=results;
            }

        }
        callback(null, res);
    },searchFlight);

}

exports.handle_request = handle_request;