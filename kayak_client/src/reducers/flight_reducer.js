import * as left_nav_util from './../utils/laft_nav_helper';
const initialState = {
 flights:[{
                flight_carrier_name:"Lufthanza",
                flight_operation_day:3,
                flight_departure_time:" 12:00 PM",
                flight_duration:240,
                flight_src_city : "San Jose",
                flight_destination_city : "San Diego",
                flight_price:249,
                flight_landing_time :"12:00:00",
                flight_passengers:3
              }],
 displayflights:[],
 current_flight:[],
    flight_days:[],
    booked_flight:[],
    flight_finalamount:[],
    leftFlightNavConfig:{
        flight_duration:10,
        flight_price:1000,
    }

};
export default function flightdetails_reducer(state = initialState, action) {
    switch (action.type) {

        case 'FLIGHT_SUCCESS':
            return {
                ...state,
                flights: action.result,
                displayflights: action.result
            };
        case 'FLIGHT_FAILURE':
            return {
                ...state,
                error: action.error
            };
        case 'CURRENT_FLIGHT':
            return{
                ...state,
                current_flight:action.result
            };
        case 'FLIGHT_DAYS':
            return{
                ...state,
                flight_days:action.result
            };
        case 'FLIGHT_BOOKED':{
            return{
                ...state,
                booked_flight:action.result
            }
        }
        case 'FLIGHT_FINALAMOUNT':
            return{
                ...state,
                flight_finalamount:action.result
            }
        case 'SET_FLIGHT_CONFIG':
            let updatedflightlist = left_nav_util.filterFlightbasedOnLeftNavBar(state.flights.slice(),action.config);
            return Object.assign({},state,{
                leftFlightNavConfig:action.config,
                displayflights:updatedflightlist
            })
        default:
            return state
    }
}

