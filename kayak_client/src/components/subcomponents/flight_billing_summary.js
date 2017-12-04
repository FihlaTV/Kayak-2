import React,{ Component } from 'react';
import './../../images/subcomponent.css';
import {connect} from 'react-redux';

class FlightBillingSummary extends Component {

    render() {
        return (
            <div className="flight-billing-summary">
                <div className="car-summary" >
                    <div className="car-summary-1">
                        <h4>Summary</h4>
                        <hr/>
                        <h6>Depart: {this.props.flight_days.flightfromdate}</h6>
                        <h6>Flight: {this.props.current_flight.flight_id}</h6>
                        <hr/>
                    </div >
                    <div className="car-summary-2">
                        <div>
                            <h5> Charges : ${(this.props.flight_days.flight_passengers* this.props.current_flight.flight_price)} </h5>
                            <hr/>
                        </div>

                        <div>
                            <h5>Tax and Fees : $35</h5>
                            <hr/>
                        </div>

                        <div>
                            <h5>Total cost:  <b style={{fontSize:20}}>${(this.props.flight_days.flight_passengers* this.props.current_flight.flight_price+35)}</b> </h5>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log("hiii"+state.flightdetails_reducer.flight_days.days);
    return {
        flight_days: state.flightdetails_reducer.flight_days,
        current_flight:state.flightdetails_reducer.current_flight,
        flight_finalamount:state.flightdetails_reducer.flight_finalamount
    };

}

export default connect(mapStateToProps,null)(FlightBillingSummary);