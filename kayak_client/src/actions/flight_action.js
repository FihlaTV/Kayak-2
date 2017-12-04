import {searchflightsAPI,bookflightAPI} from '../api/flightAPI';
import {history} from "../utils/util";

export function searchflights_action(payload){
    console.log("its passengers"+payload.flight_passengers);
    return dispatch => {
        var ONE_DAY = 1000 * 60 * 60 * 24;
        var start_d= new Date(payload.flight_start_date+'T00:00:00');
        var end_d= new Date(payload.flight_end_date+'T00:00:00');
        var date1_ms = start_d.getTime();
        var date2_ms = end_d.getTime();
        var difference_ms = Math.abs(date1_ms - date2_ms);
        var setday = {
            flightfromdate: start_d.toDateString(),
            flighttodate: end_d.toDateString(),
            days: Math.round(difference_ms/ONE_DAY),
            flight_start_date:payload.flight_start_date,
            flight_end_date:payload.flight_end_date,
            flight_passengers: payload.flight_passengers

        };
        dispatch(setflightdates(setday));
        searchflightsAPI(payload)
            .then(
                response => {
                    if(response.status===200)
                    {
                        response.json().then((response) => {
                            dispatch(success(response.result));
                            history.push('/flightdetails');
                        });
                    }
                    else
                    {
                        // alert(response.message);
                        dispatch(failure(response.message));
                        alert("Oopss!! Failed to find flight on required day..Try again!!!");
                    }
                }
            );
    };
    function setflightdates(result){return { type :'FLIGHT_DAYS',result }}
    function success(result) { return { type: 'FLIGHT_SUCCESS', result } }
    function failure(error) { return { type: 'FLIGHT_FAILURE', error } }
}
export function currentflight_action(payload)
{
    console.log("its payload in currentflight_action"+payload.flight_passengers);
    return dispatch => {
        dispatch(success(payload));
    };
    function success(result) { return { type: 'CURRENT_FLIGHT', result } }
}


export function setPrice(payload)
{
    return dispatch => {
        dispatch(setflightprice(payload));
    };
    function setflightprice(result){return { type :'FLIGHT_FINALAMOUNT',result }}
}
export function bookflight_action(payload){
    return dispatch => {
        bookflightAPI(payload)
            .then(
                response => {
                    if(response.status===200)
                    {
                        response.json().then((response) => {
                            alert("Have a safe travels!!");
                            history.push('/flights');
                        });
                    }
                    else
                    {
                        dispatch(failure(response.message));
                    }
                }
            );
    };

    function failure(error) { return { type: 'FLIGHT_FAILURE', error } }
}
export function addTripProtection_action(payload)
{
    return dispatch => {
        dispatch(setflightprice({booking_amount:payload}));
    };
    function setflightprice(result){return { type :'FLIGHT_FINALAMOUNT',result }}
}
export const updateLastAdminSearch = (last_search) => {
    console.log("Action UPDATE_LAST_FLIGHT_ADMIN_SEARCH");
    return {
        type: "UPDATE_LAST_FLIGHT_ADMIN_SEARCH",
        last_search: last_search
    }
}
export const setFlightConfig = (config)=>{
    return {
        type:'SET_FLIGHT_CONFIG',
        config:config
    }
};
