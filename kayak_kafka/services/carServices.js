var Cars = require('./../models/cars');

function handleAddCar(data, callback){
    console.log('In add car'+ data);
    var carDetail = new Cars.Cars({
            car_model_no:data.car_model_no,
            car_name:data.car_name,
            car_capacity:data.car_capacity,
            car_no_of_bags:data.car_no_of_bags,
            car_no_of_doors:data.car_no_of_doors,
            car_price:data.car_price,
            car_src_city:data.car_src_city,
            car_destination_city:data.car_destination_city,
            car_rental_agency:data.car_rental_agency,
            car_type:data.car_type
        }
    );
    Cars.addNewCar( carDetail , function(err , res){
        if(err){
            console.log(err);
            res ='err';
        }
        console.log(res);
        callback(err,res);
    });
}

function handleSearchCars(data, callback){
    console.log('In search car'+ data);
    Cars.searchCars( data , function(err , res){
        if(err){
            console.log(err);
            res ='err';
        }

            console.log(res);
            callback(null,res);
    });
}

function handleEditCar(data, callback){
    console.log('In edit car'+ data);
    if(!data.car_model_no){
        callback("Model is missing, failed to edit without model_no",null);
    }else{
        var carEditData = {};
        if(data.car_name)
            carEditData.car_name = data.car_name;
        if(data.car_capacity)
            carEditData.car_capacity = data.car_capacity;
        if(data.car_no_of_bags)
            carEditData.car_no_of_bags = data.car_no_of_bags;
        if(data.car_no_of_doors)
            carEditData.car_no_of_doors = data.car_no_of_doors;
        if(data.car_price)
            carEditData.car_price = data.car_price;
        if(data.car_src_city)
            carEditData.car_src_city = data.car_src_city;
        if(data.car_destination_city)
            carEditData.car_destination_city = data.car_destination_city;
        if(data.car_rental_agency)
            carEditData.car_rental_agency = data.car_rental_agency;
        if(data.car_type)
            carEditData.car_type = data.car_type;
        Cars.editCar(data.car_model_no, carEditData, function(err,res){
            if(err){
                console.log(err);
                res ='err';
            }
            console.log(res);
            callback(err, res);
        });
    }

}

function handleDeleteCar(data, callback){
    console.log('In delete car'+ data);
    Cars.deleteCar( data.car_model_no , function(err , res){
        if(err){
            console.log(err);
            res ='err';
        }
        console.log(res);
        callback(err,res);
    });
}

function handleBookCar (data, callback){
    var carDetail ={
        user_id:data.user_id,
        booking_date:data.booking_date,
        booking_amount:data.booking_amount,
        start_date:data.start_date,
        end_date:data.end_date,
        car_name:data.car_name,
        car_src_city:data.car_src_city,
        car_destination_city:data.car_destination_city,
        car_rental_agency:data.car_rental_agency};
    console.log(carDetail);
    Cars.bookCar( carDetail , function(err , res){
        if(err){
            console.log(err);
            res= 'err';
        }
        console.log(res);
        callback(err,res);
    });
}


module.exports.handleSearchCars = handleSearchCars;
module.exports.handleAddCar = handleAddCar;
module.exports.handleDeleteCar = handleDeleteCar;
module.exports.handleEditCar = handleEditCar;
module.exports.handleBookCar = handleBookCar;