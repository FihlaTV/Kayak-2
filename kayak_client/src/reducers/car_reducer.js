import * as left_nav_util from './../utils/laft_nav_helper';
const initialState = {
 cars:[{
     car_name:"Audi Q3",
     car_duration:4,
     car_no_of_bags:8,
     car_no_of_doors:4,
     car_src_city : "San Jose",
     car_destination_city : "San Diego",
     car_rental_agency : "Audi Rental Groups",
     car_price:249,
     car_capacity : 4
              }],
displaycars:[],
 current_car:[],
    car_days:[],
    car_finalamount:[],
    leftNavCarConfig:{
        car_price:1000,
        car_no_of_doors:4,
        car_no_of_bags:8,
        car_capacity:4,
    }
};
export default function cardetails_reducer(state = initialState, action) {
    switch (action.type) {

        case 'CAR_SUCCESS':
            return {
                ...state,
                cars: action.result,
                displaycars:action.result
            };
        case 'CAR_FAILURE':
            return {
                ...state,
                error: action.error
            };
        case 'CURRENT_CAR':
            return{
                ...state,
                current_car:action.result
            };
        case 'CAR_DAYS':
            return{
                ...state,
                car_days:action.result
            };
        case 'CAR_FINALAMOUNT':
            return{
                ...state,
                car_finalamount:action.result
            }
        case 'CAR_BOOKED':
            return{
                ...state,
                car_booked:action.result
            }
        case 'SET_CAR_CONFIG':
            let updatedcarlist = left_nav_util.filterCarbasedOnLeftNavBar(state.cars.slice(),action.config);
            console.log(updatedcarlist);
            return Object.assign({},state,{
                leftNavCarConfig:action.config,
                displaycars:updatedcarlist
            })
        default:
            return state

    }

}