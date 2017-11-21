var connection =  new require('./kafka/Connection');
var addFlight = require('./services/addFlight');
var searchFlight = require('./services/searchFlight');

var topic_addFlight = 'addFlight_topic';
var topic_searchFlight= 'searchFlight_topic';
var consumer_addFlight = connection.getConsumer(topic_addFlight);
var consumer_searchFlight = connection.getConsumer(topic_searchFlight);
var producer = connection.getProducer();

console.log('server is running');
consumer_addFlight.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    addFlight.handle_request(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});

consumer_searchFlight.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    searchFlight.handle_request(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});
