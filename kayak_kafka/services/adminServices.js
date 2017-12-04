var Cars = require('./../models/cars');
var  Flights = require('./../models/flights');
var  Hotels = require('./../models/hotels');
var  Admin = require('./../models/admin');
var mysql = require('../models/mysql');

function handleSearchCars(data, callback){
    console.log("In searchCarsAdmin");
    Cars.searchCarsAdmin( data.car_model_no, data.car_name,  function(err , results){
        console.log("result is" + results);
        if(err){
            callback(err,null);
        }
        else{
            console.log("car admin search data passed to model function");
            callback(null,results);
        }
    });
}

function handleUpdateCar(data, callback){
    console.log("In update car admin");
    var carDetail = {
        car_model_no: data.car_model_no,
        car_capacity : data.car_capacity,
        car_no_of_bags :data.car_no_of_bags,
        car_name :data.car_name,
        car_no_of_doors :data.car_no_of_doors,
        car_price :data.car_price,
        car_src_city :data.car_src_city,
        car_destination_city :data.car_destination_city,
        car_rental_agency :data.car_rental_agency,
        car_type :data.car_type
    };
    Cars.updateCarAdmin(carDetail, function(err , results){
        if(err){
            callback(err,null);
        }
        else{
            console.log("Hotel update data passed to model function");
            callback(null,results);
        }
    });
}

function handleSearchFlights(data, callback){
    console.log("In searchFlightsAdmin");
    Flights.searchFlightsAdmin( data.flight_id, data.carrier_name,  function(err , results){
        console.log("result is" + results);
        if(err){
            callback(err,null);
        }
        else{
            console.log("flight admin search data passed to model function");
            callback(null,results);
        }
    });
}

function handleUpdateFlight(data, callback){
    console.log("In update flight admin");
    var flightDetail = {
        flight_id : data.flight_id,
        flight_carrier_name : data.flight_carrier_name,
        flight_src_city :data.flight_src_city,
        flight_destination_city :data.flight_destination_city,
        flight_duration :data.flight_duration,
        flight_operational_day :data.flight_operational_day,
        flight_departure_time :data.flight_departure_time,
        flight_price :data.flight_price
    };
    Flights.updateFlightAdmin(flightDetail, function(err , results){
        if(err){
            callback(err,null);
        }
        else{
            console.log("Flight update data passed to model function");
            callback(null,results);
        }
    });
}

function handleSearchHotels(data, callback){
    console.log("In searchHotelsAdmin");
    Hotels.searchHotelsAdmin( data.hotel_id, data.hotel_name,  function(err , results){
        console.log("result is" + results);
        if(err){
            callback(null,err);
        }
        else{
            console.log("Hotel admin search data passed to model function");
            callback(null,results);
        }
    });
}


function handleUpdateHotel(data, callback){
    console.log("In update Hotel admin");
    var hotelDetail = {
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
    };
    Hotels.updateHotelAdmin(hotelDetail, function(err , results){
        if(err){
            callback(err,null);
        }
        else{
            console.log("Hotel update data passed to model function");
            callback(null,results);
        }
    });
}

function handleCarBillingInfo(data,callback) {
    mysql.fetchData(function(err,results) {

        if(err){
            console.log("[Kafka] Error adminCarBilling");
        }
        callback(err,results);
    }, data.query);
}

function handleFlightBillingInfo(data,callback) {
    mysql.fetchData(function(err,results) {

        if(err){
            console.log("[Kafka] Error adminflightBilling");
        }
        callback(err,results);
    }, data.query);
}

function handleHotelBillingInfo(data,callback) {
    mysql.fetchData(function(err,results) {

        if(err){
            console.log("[Kafka] Error adminflightBilling");
        }
        callback(err,results);
    }, data.query);
}

exports.adminSignIn = function(data, callback){
    console.log("adminSignIn:data",data);
    var adminDetail = {
        username:data.username,
        password:data.password
    };
    Admin.adminSignIn( adminDetail , function(err , results){
        if(err){
            console.log("[Kafka] Error in siging in admin")
        }
        console.log("its result in admin services signin"+results);
        callback(err,results);
    });
};

exports.adminTotalSalesAnalysis = function(data , callback){
    getTotalSalesUtil(function(err,result){
        if(err){
            console.log("[Kafka] Error in adminTotalSalesAnalysis: error - ",err);
        }
        callback(err,result);

    });
};

function getTotalSalesUtil(callback){
    var carcount_query = "select count(booking_id) as car_count from car_booking";
    var res_result ={car_sales:0,flight_sales:0,hotel_sales:0,user_booking:0}
    var res_error = null;
    mysql.fetchData(function(err,results) {
        if(err){
            console.log("[Kafka] Error adminCarSales error - ",err);
            res_error = err;
        }else{
            console.log("car count:",results[0].car_count);
            res_result.car_sales = results[0].car_count;
        }
        var flightcount_query = "select count(booking_id) as flight_count from flight_booking";
        mysql.fetchData(function(err,results) {
            if(err){
                console.log("[Kafka] Error adminflightSales error - ",err);
                res_error = err;
            }else{
                console.log("flight count:",results[0].flight_count);
                res_result.flight_sales = results[0].flight_count;
            }
            var hotelcount_query = "select count(booking_id) as hotel_count from hotel_booking";
            mysql.fetchData(function(err,results) {
                if(err){
                    console.log("[Kafka] Error adminhotelSales error - ",err);
                    res_error = err;
                }else{
                    console.log("hotel count:",results[0].hotel_count);
                    res_result.hotel_sales = results[0].hotel_count;
                }
                res_result.user_booking = res_result.car_sales + res_result.flight_sales + res_result.hotel_sales;
                callback(res_error,res_result);
            },hotelcount_query);

        },flightcount_query);

    },carcount_query);
}

exports.adminFlightAnalysis = function(data , callback){
    //Analysis#1
    var finalResult = [];
    var flight_analysis_query1="select sum(booking_amount) as Booking_Amount,flight_name from flight_booking where Year(booking_date) = '"+data.year+"' group by flight_name order by Booking_Amount desc limit 10";
    var result1 = {};
    result1.carriers = [];
    result1.sales= [];

    mysql.fetchData(function(err,results) {

        if(err){
            console.log("error");
        }
        else{
            results.map((value)=>{
                result1.carriers.push(value.flight_name);
            result1.sales.push(value.Booking_Amount);
        });
            console.log("result1 ******",result1);
            finalResult.push({top_ten_carrier_sales:result1});

            //Analysis#2
            var flight_analysis_query2="select flight_src_city,sum(booking_amount) as Booking_Amount from flight_booking group by flight_src_city order by Booking_Amount";
            var result2 ={};
            result2.cities =[];
            result2.sales=[];

            mysql.fetchData(function(err,results) {

                if(err){
                    console.log("error");
                }
                else{
                    console.log("Results from database:"+JSON.stringify(results));
                    results.map((value)=>{
                        result2.cities.push(value.flight_src_city);
                    result2.sales.push(value.Booking_Amount);
                });

                    console.log("result2****",result2);
                    finalResult.push({top_ten_city_sales:result2});


                    //Analysis#3
                    var flight_analysis_query3="select flight_name,count(flight_id) as Number_Of_Bookings,sum(booking_amount) as Booking_Amount from flight_booking where month(booking_date) = month(current_date())-1 group by flight_name order by Number_Of_Bookings desc limit 10";

                    var result3 ={};
                    result3.carriers = [];
                    result3.bookings=[];

                    mysql.fetchData(function(err,results) {
                        console.log("results:  ",results);

                        if(err){
                            console.log("error");
                            result3.message = "Error could not find top ten hotels"
                            //callback(null,err);
                        }
                        console.log("Results from database:"+JSON.stringify(results));

                        results.map((value)=>{
                            result3.carriers.push(value.flight_name);
                        result3.bookings.push(value.Number_Of_Bookings);
                    });
                        console.log("result3****",result3);
                        finalResult.push({top_ten_carrier_bookings:result3});
                        var result_1 = {status:201,finalResult : finalResult};

                        console.log("analysis result:",result_1);
                        callback(null, result_1);

                    }, flight_analysis_query3);

                }
            }, flight_analysis_query2);


        }
    }, flight_analysis_query1);

}

exports.adminHotelAnalysis = function(data , callback){
    //Analysis#1
    var finalResult = [];
    var hotel_analysis_query1="select sum(booking_amount) as Booking_Amount,hotel_name from hotel_booking where Year(booking_date) = '"+data.year+"' group by hotel_name order by Booking_Amount desc limit 10";
    var result1 = {};
    result1.hotels = [];
    result1.sales= [];

    mysql.fetchData(function(err,results) {

        if(err){
            console.log("error");
        }
        else{
            results.map((value)=>{
                result1.hotels.push(value.hotel_name);
            result1.sales.push(value.Booking_Amount);
        });
            console.log("result1 ******",result1);
            finalResult.push({top_ten_hotel_sales:result1});

            //Analysis#2
            var hotel_analysis_query2="select hotel_city,sum(booking_amount) as Booking_Amount from hotel_booking group by hotel_city order by Booking_Amount";
            var result2 ={};
            result2.city_name =[];
            result2.sales=[];

            mysql.fetchData(function(err,results) {

                if(err){
                    console.log("error");
                }
                else{
                    console.log("Results from database:"+JSON.stringify(results));
                    results.map((value)=>{
                        result2.city_name.push(value.hotel_city);
                    result2.sales.push(value.Booking_Amount);
                });

                    console.log("result2****",result2);
                    finalResult.push({top_ten_hotel_sales_city:result2});


                    //Analysis#3
                    var hotel_analysis_query3="select hotel_name,count(hotel_id) as Number_Of_Bookings,sum(booking_amount) as Booking_Amount from hotel_booking where month(booking_date) = month(current_date())-1 group by hotel_name order by Number_Of_Bookings desc limit 10";

                    var result3 ={};
                    result3.hotels = [];
                    result3.sales=[];

                    mysql.fetchData(function(err,results) {
                        console.log("results:  ",results);

                        if(err){
                            console.log("error");
                            result3.message = "Error could not find top ten hotels"
                            //callback(null,err);
                        }
                        console.log("Results from database:"+JSON.stringify(results));

                        results.map((value)=>{
                            result3.hotels.push(value.hotel_name);
                        result3.sales.push(value.Number_Of_Bookings);
                    });
                        console.log("result3****",result3);
                        finalResult.push({top_ten_host_sales:result3});
                        var result_1 = {status:201,finalResult : finalResult};

                        console.log("analysis result:",result_1);
                        callback(null, result_1);

                    }, hotel_analysis_query3);

                }
            }, hotel_analysis_query2);


        }
    }, hotel_analysis_query1);

}

exports.adminCarAnalysis = function(data , callback){
    //Analysis#1
    var finalResult = [];
    var car_analysis_query1="select sum(booking_amount) as Booking_Amount,car_name from car_booking where Year(booking_date) = '"+data.year+"' group by car_name order by Booking_Amount desc limit 10";
    var result1 = {};
    result1.models = [];
    result1.sales= [];

    mysql.fetchData(function(err,results) {

        if(err){
            console.log("error");
        }
        else{
            results.map((value)=>{
                result1.models.push(value.car_name);
            result1.sales.push(value.Booking_Amount);
        });
            console.log("result1 ******",result1);
            finalResult.push({top_ten_car_sales:result1});

            //Analysis#2
            var car_analysis_query2="select car_src_city,sum(booking_amount) as Booking_Amount from car_booking group by car_src_city order by Booking_Amount";
            var result2 ={};
            result2.cities =[];
            result2.sales=[];

            mysql.fetchData(function(err,results) {

                if(err){
                    console.log("error");
                }
                else{
                    console.log("Results from database:"+JSON.stringify(results));
                    results.map((value)=>{
                        result2.cities.push(value.car_src_city);
                    result2.sales.push(value.Booking_Amount);
                });

                    console.log("result2****",result2);
                    finalResult.push({top_ten_city_sales:result2});


                    //Analysis#3
                    var car_analysis_query3="select sum(booking_amount) as Booking_Amount,car_rental_agency from car_booking where month(booking_date) = month(current_date())-1 group by car_rental_agency order by Booking_Amount desc limit 10";;

                    var result3 ={};
                    result3.agencies = [];
                    result3.sales=[];

                    mysql.fetchData(function(err,results) {
                        console.log("results:  ",results);

                        if(err){
                            console.log("error");
                            result3.message = "Error could not find top ten hotels"
                            //callback(null,err);
                        }
                        console.log("Results from database:"+JSON.stringify(results));

                        results.map((value)=>{
                            result3.agencies.push(value.car_rental_agency);
                        result3.sales.push(value.Number_Of_Bookings);
                    });
                        console.log("result3****",result3);
                        finalResult.push({top_ten_agency_sales:result3});
                        var result_1 = {status:201,finalResult : finalResult};

                        console.log("analysis result:",result_1);
                        callback(null, result_1);

                    }, car_analysis_query3);

                }
            }, car_analysis_query2);


        }
    }, car_analysis_query1);

}




module.exports.handleSearchCars = handleSearchCars;
module.exports.handleUpdateCar = handleUpdateCar;
module.exports.handleSearchFlights = handleSearchFlights;
module.exports.handleUpdateFlight = handleUpdateFlight;
module.exports.handleSearchHotels = handleSearchHotels;
module.exports.handleUpdateHotel = handleUpdateHotel;
module.exports.handleCarBillingInfo = handleCarBillingInfo;
module.exports.handleFlightBillingInfo = handleFlightBillingInfo;
module.exports.handleHotelBillingInfo = handleHotelBillingInfo;