var connection =  new require('./kafka/Connection');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoURL = "mongodb://localhost:27017/kayak_database";
var promise = mongoose.connect(mongoURL, {
    useMongoClient: true
});

var flights = require('./services/flightServices');
var cars = require('./services/carServices');
var hotels = require('./services/hotelServices');
var users = require('./services/userServices');
var admin = require('./services/adminServices');

var topic_addFlight = 'add_flight';
var topic_searchFlight= 'search_flight';
var topic_deleteFlight= 'delete_flight';
var topic_editFlight= 'edit_flight';
var topic_bookFlight='book_flight';

var topic_addHotel ='add_hotel';
var topic_searchHotel ='search_hotel';
var topic_deleteHotel= 'delete_hotel';
var topic_editHotel= 'edit_hotel';
var topic_bookHotel='book_hotel';

var topic_addCar ='add_car';
var topic_searchCar ='search_car';
var topic_deleteCar= 'delete_car';
var topic_editCar= 'edit_car';
var topic_bookCar='book_car';

var topic_signin='signin';
var topic_signup='signup';
var topic_google_login ='google_login';
var topic_facebook_login ='facebook_login';
var topic_update_user ='update_user';

var topic_analysis_flight='admin_analysis_flight';
var topic_analysis_hotel='admin_analysis_hotel';
var topic_analysis_car='admin_analysis_car';


// var topic_adminHotel= 'admin_hotel';
// var topic_adminFlight= 'admin_flight';
// var topic_adminCar= 'admin_car';
var topic_admin_signin = 'admin_signin';
var topic_admin_signup = 'admin_signup';
var topic_admin_searchCar = 'admin_searchCar';
var topic_admin_updateCar = 'admin_updateCar';
var topic_admin_searchFlight = 'admin_searchFlight';
var topic_admin_updateFlight = 'admin_updateFLight';
var topic_admin_searchHotel = 'admin_searchHotel';
var topic_admin_updateHotel = 'admin_updateHotel';
var topic_admin_carBillingInfo = 'admin_carBillingInfo';
var topic_admin_flightBillingInfo = 'admin_flightBillingInfo';
var topic_admin_hotelBillingInfo = 'admin_hotelBillingInfo';
var topic_admin_total_sales   = 'admin_total_sales';

var consumer_addFlight = connection.getConsumer(topic_addFlight);
var consumer_analysis_flight= connection.getConsumer(topic_analysis_flight);
var consumer_analysis_car= connection.getConsumer(topic_analysis_car);
var consumer_analysis_hotel= connection.getConsumer(topic_analysis_hotel);
var consumer_searchFlight = connection.getConsumer(topic_searchFlight);
var consumer_deleteFlight = connection.getConsumer(topic_deleteFlight);
var consumer_editFlight = connection.getConsumer(topic_editFlight);
var consumer_bookFlight = connection.getConsumer(topic_bookFlight);

var consumer_addHotel = connection.getConsumer(topic_addHotel);
var consumer_searchHotel = connection.getConsumer(topic_searchHotel);
var consumer_deleteHotel = connection.getConsumer(topic_deleteHotel);
var consumer_editHotel = connection.getConsumer(topic_editHotel);
var consumer_bookHotel = connection.getConsumer(topic_bookHotel);

var consumer_addCar = connection.getConsumer(topic_addCar);
var consumer_searchCar= connection.getConsumer(topic_searchCar);
var consumer_deleteCar = connection.getConsumer(topic_deleteCar);
var consumer_editCar = connection.getConsumer(topic_editCar);
var consumer_bookCar = connection.getConsumer(topic_bookCar);

var consumer_signin= connection.getConsumer(topic_signin);
var consumer_signup= connection.getConsumer(topic_signup);
var consumer_google_login= connection.getConsumer(topic_google_login);
var consumer_facebook_login= connection.getConsumer(topic_facebook_login);
var consumer_update_user= connection.getConsumer(topic_update_user);

var consumer_admin_signin = connection.getConsumer(topic_admin_signin);
var consumer_admin_signup = connection.getConsumer(topic_admin_signup);
var consumer_admin_searchCar = connection.getConsumer(topic_admin_searchCar);
var consumer_admin_updateCar = connection.getConsumer(topic_admin_updateCar);
var consumer_admin_searchFlight = connection.getConsumer(topic_admin_searchFlight);
var consumer_admin_updateFlight = connection.getConsumer(topic_admin_updateFlight);
var consumer_admin_searchHotel = connection.getConsumer(topic_admin_searchHotel);
var consumer_admin_updateHotel = connection.getConsumer(topic_admin_updateHotel);
var consumer_admin_carBillingInfo = connection.getConsumer(topic_admin_carBillingInfo);
var consumer_admin_flightBillingInfo = connection.getConsumer(topic_admin_flightBillingInfo);
var consumer_admin_hotelBillingInfo = connection.getConsumer(topic_admin_hotelBillingInfo);
var consumer_admin_total_sales = connection.getConsumer(topic_admin_total_sales);

var producer = connection.getProducer();

console.log('server is running');
consumer_addFlight.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    flights.handleAddFlight(data.data, function(err,res){
        console.log('after handle');
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

consumer_analysis_car.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    admin.adminCarAnalysis(data.data, function(err,res){
        console.log('after handle');
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

consumer_analysis_flight.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    admin.adminFlightAnalysis(data.data, function(err,res){
        console.log('after handle');
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

consumer_analysis_hotel.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    admin.adminHotelAnalysis(data.data, function(err,res){
        console.log('after handle');
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
    flights.handleSearchFlights(data.data, function(err,res){
        console.log('after handle');
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

consumer_deleteFlight.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    flights.handleDeleteFlight(data.data, function(err,res){
        console.log('after handle');
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

consumer_editFlight.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    flights.handleEditFlight(data.data, function(err,res){
        console.log('after handle');
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

consumer_bookFlight.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    flights.handleBookFlight(data.data, function(err,res){
        console.log('after handle');
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

consumer_addHotel.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    hotels.handleAddHotel(data.data, function(err,res){
        console.log('after handle');
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

consumer_searchHotel.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    hotels.handleSearchHotels(data.data, function(err,res){
        console.log('after handle');
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

consumer_editHotel.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    hotels.handleEditHotel(data.data, function(err,res){
        console.log('after handle');
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

consumer_deleteHotel.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    hotels.handleDeleteHotel(data.data, function(err,res){
        console.log('after handle');
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

consumer_bookHotel.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    hotels.handleBookHotel(data.data, function(err,res){
        console.log('after handle');
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

consumer_addCar.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    cars.handleAddCar(data.data, function(err,res){
        console.log('after handle');
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

consumer_searchCar.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    cars.handleSearchCars(data.data, function(err,res){
        console.log('after handle');
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

consumer_deleteCar.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    cars.handleDeleteCar(data.data, function(err,res){
        console.log('after handle');
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

consumer_editCar.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    cars.handleEditCar(data.data, function(err,res){
        console.log('after handle');
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

consumer_bookCar.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    cars.handleBookCar(data.data, function(err,res){
        console.log('after handle');
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


consumer_google_login.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    users.handleGoogleLogin(data.data, function(err,res){
        console.log('after handle');
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

consumer_facebook_login.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    users.handleFacebookLogin(data.data, function(err,res){
        console.log('after handle');
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

consumer_signin.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    users.handleLoginUser(data.data, function(err,res){
        console.log('after handle');
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

consumer_signup.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    users.handleAddUser(data.data, function(err,res){
        console.log('after handle');
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

consumer_admin_searchCar.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    admin.handleSearchCars(data.data, function(err,res){
        console.log('after handle');
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

consumer_admin_updateCar.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    admin.handleUpdateCar(data.data, function(err,res){
        console.log('after handle');
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

consumer_admin_searchFlight.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    admin.handleSearchFlights(data.data, function(err,res){
        console.log('after handle');
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

consumer_admin_updateFlight.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    admin.handleUpdateFlight(data.data, function(err,res){
        console.log('after handle');
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


consumer_admin_searchHotel.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    admin.handleSearchHotels(data.data, function(err,res){
        console.log('after handle');
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

consumer_admin_updateHotel.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    admin.handleUpdateHotel(data.data, function(err,res){
        console.log('after handle');
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

consumer_admin_carBillingInfo.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    admin.handleCarBillingInfo(data.data, function(err,res){
        console.log('after handle');
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

consumer_admin_flightBillingInfo.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    admin.handleFlightBillingInfo(data.data, function(err,res){
        console.log('after handle');
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

consumer_admin_hotelBillingInfo.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    admin.handleHotelBillingInfo(data.data, function(err,res){
        console.log('after handle');
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

consumer_update_user.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    users.updateUser(data.data, function(err,res){
        console.log('after handle');
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

consumer_admin_signin.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    admin.adminSignIn(data.data, function(err,res){
        console.log('after handle');
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

consumer_admin_total_sales.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    admin.adminTotalSalesAnalysis(data.data, function(err,res){
        console.log('after handle');
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