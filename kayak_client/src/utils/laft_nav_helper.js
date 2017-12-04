const left_nav_config = {
    car_capacity:4,
    car_no_of_bags:4,
    car_price:1000,
    car_no_of_doors:4,
}
function setCapacity(capacity, config){
    if(capacity<=2){
        config.capacity['one_to_two']=true;
    }else if(capacity<6){
        config.capacity['three_to_five']=true;
    }else{
        config.capacity['six_or_more'] = true;
    }
}

function setNoOfBags(no_of_bags,config){
    if(no_of_bags<=2){
        config.bags['one_to_two']=true;
    }else if(no_of_bags<=5){
        config.bags['three_to_five']=true;
    }
}
export  function getleftNavConfigForCar(listofcars){
    var config = left_nav_config;
    // listofcars.map((car)=>{
    //   setCapacity(car.car_capacity,config);
    //   setNoOfBags(car.car_no_of_bags,config);
    //   config.cartype[car.car_type] = true;
    //   config.rentalagency[car.rental_agency]=true;
    // });
    console.log("config: ",config);
    return config;
}

function includeCarWithCapacity(capacity, config ){
    //console.log("capacity",capacity, "config",config.capacity['three_to_five']);
    if(capacity> 0 && capacity <=2 && config.capacity['one_to_two']) return true;
    if(capacity>2 && capacity <=5 && config.capacity['three_to_five']) return true;
    if(capacity>=6 && config.capacity['six_or_more']) return true;
    return false;
}

function includeCarWithBags(no_of_bags, config){
    //console.log("no_of_bags",no_of_bags, "config",config.bags);
    if(no_of_bags> 0 && no_of_bags <=2 && config.bags['one_to_two']) return true;
    if(no_of_bags > 2 && no_of_bags <=5 && config.bags['three_to_five']) return true;
    return false;
}

export function filterCarbasedOnLeftNavBar(listofCars, config){
    console.log("listofCars, ",listofCars,"config : !!!", config.car_no_of_bags);
    var result_cars = [];
    listofCars.map((car)=>{
        if(car.car_price <= config.car_price && car.car_capacity <= config.car_capacity && car.car_no_of_doors <= config.car_no_of_doors && car.car_no_of_bags <=config.car_no_of_bags){
            result_cars.push(car)
        }
    });
    console.log("filtered :",result_cars);
    return result_cars;
}

export function getleftNavConfigForFlight(listofflights){
    var config = {flight_duration:20,flight_price:1000};
    console.log("* getLeftNavConfig * flight config: ",config);
    return config;
}

export function filterFlightbasedOnLeftNavBar(listofflights, config){
    console.log("listofflights, ",listofflights,"config : !!!", config)
    var result_flight = [];
    listofflights.map((flight)=>{
        console.log("Flight duration: "+flight.flight_duration+"* flight_price: "+flight.flight_price+"!!!!!!!!!!!");
        if(flight.flight_duration <= config.flight_duration && flight.flight_price <= config.flight_price){
            result_flight.push(flight)
        }
    });
    console.log("flight filtered :",result_flight);
    return result_flight;
}

export function getleftNavConfigForHotel(listofhotels){
    var config = {hotel_stars: 2,
        hotel_rating:3,
        hotel_price: 10000};
    listofhotels.map((hotel)=>{
        config.stars[hotel.hotel_stars]=true;
    });
    console.log("hotel config: ",config);
    return config;
}

export function filterHotelbasedOnLeftNavBar(listofhotels, config){
    console.log("listofhotels, ",listofhotels,"config : !!!", config)
    var result_hotel = [];
    listofhotels.map((hotel)=>{
        if(hotel.hotel_stars <= config.hotel_stars  && hotel.hotel_price <= config.hotel_price && hotel.hotel_rating <= config.hotel_rating){
            result_hotel.push(hotel)
        }
    });
    console.log("hotel filtered :",result_hotel);
    return result_hotel;
}