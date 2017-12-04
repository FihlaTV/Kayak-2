var mongoose = require('mongoose');
var mysql = require('./mysql');
var Schema = mongoose.Schema;

var carSchema = new Schema({
    car_model_no:{type:String, required : true},
    car_capacity:{type:Number, required : true},
    car_no_of_bags:{type:Number, required : true},
    car_name:{type:String, required:true},
    car_no_of_doors:{type:Number, required : true},
    car_price:{type:Number, required : true},
    car_src_city:{type:String, required : true},
    car_destination_city:{type:String, required : true},
    car_rental_agency:{type:String, required : true},
    car_type:{type:String, required : true
    }
});


const Cars = mongoose.model('cars',carSchema);

function addNewCar(carDetail, callback){
    carDetail.save(callback);
}

function searchCars(parameter, callback){
    Cars.find(parameter, callback);
}

function editCar(car_model_no,carDetail, callback){
    Cars.update({ car_model_no: car_model_no}, {$set: carDetail}, callback);
}

function deleteCar(model_no, callback){
    Cars.findOneAndRemove({car_model_no:model_no}, callback);
}

function bookCar(carDetail, callback){
    console.log("its in book new car"+carDetail);
    var bookCar = "INSERT INTO car_booking(user_id,car_src_city,car_destination_city,car_rental_agency,car_name,booking_date,booking_amount,start_date,end_date) VALUES ('" + carDetail.user_id + "','" + carDetail.car_src_city + "','" + carDetail.car_destination_city + "','" + carDetail.car_rental_agency + "','" + carDetail.car_name + "','" + carDetail.booking_date + "','" + carDetail.booking_amount + "','" + carDetail.start_date + "','" + carDetail.end_date + "')";
    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }
        else
        {
            console.log("its result after mysql query"+result);
            callback(null,result);
        }
    }, bookCar);
}

function searchCarsAdmin(car_model_no, car_name, callback){
    var query = {};
    if(car_model_no)
        query.car_model_no = car_model_no;
    if(car_name)
        query.car_name = car_name;
    console.log("searchCarAdmin:",query);
    Cars.find(query, callback);
}

function updateCarAdmin(carDetail,callback){
    console.log(carDetail.car_price);
    Cars.update({car_model_no : carDetail.car_model_no},{$set:{
        car_capacity : carDetail.car_capacity,
        car_no_of_bags :carDetail.car_no_of_bags,
        car_name :carDetail.car_name,
        car_no_of_doors :carDetail.car_no_of_doors,
        car_price :carDetail.car_price,
        car_src_city :carDetail.car_src_city,
        car_destination_city :carDetail.car_destination_city,
        car_rental_agency :carDetail.car_rental_agency,
        car_type :carDetail.car_type
    }},callback);
}



module.exports.addNewCar = addNewCar;
module.exports.searchCars = searchCars;
module.exports.editCar = editCar;
module.exports.deleteCar = deleteCar;
module.exports.bookCar = bookCar;
module.exports.searchCarsAdmin = searchCarsAdmin;
module.exports.updateCarAdmin = updateCarAdmin;
module.exports.Cars = Cars;
