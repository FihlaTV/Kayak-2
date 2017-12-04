import React,{ Component } from 'react';
import './../../images/subcomponent.css';
import booknow from './../../images/booknow.jpg';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {bookflight_action} from './../../actions/flight_action';

class FlightsTermsAndConditions extends Component {
    constructor(props){
        super(props);
        this.handleView = this.handleView.bind(this);
    }

    handleView(data){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var mn = today.getMinutes();
        var ss = today.getSeconds();
        var booking = yyyy+"/"+mm+"/"+dd+" "+ hh +":"+ mn+":"+ss;
        const payload={
            user_id:this.props.user_id.user_id,
            flight_id:this.props.current_flight.flight_id,
            flight_name:this.props.current_flight.flight_carrier_name,
            flight_src_city:this.props.current_flight.flight_src_city,
            flight_destination_city:this.props.current_flight.flight_destination_city,
            flightfromdate:this.props.flight_days.flightfromdate,
            flighttodate:this.props.flight_days.flighttodate,
            flight_passengers : this.props.flight_days.flight_passengers,
            booking_amount:(this.props.flight_days.flight_passengers* this.props.current_flight.flight_price)+ 35,
            booking_date:booking
        };
        this.props.bookflight_action(payload);

    }

    render() {
        return (
            <div className = "flights-terms-and-conditions">
                <h4>Terms & Conditions</h4>
                <hr/>
                <div className="terms-and-conditions-div form-control">
                    By clicking "Book now" you agree to KAYAK's policies.
                </div>
                <br></br>

                <br></br>
                <input type ="image" onClick ={() => this.handleView(this.props.current_flight)} src = {booknow} style={{height : 30}}/>

            </div>

        );
    }
}
function mapStateToProps(state) {
    console.log("mapping state to props in booking "+state.flightdetails_reducer.current_flight.carrier);
    return {
        current_flight:state.flightdetails_reducer.current_flight,
        flight_finalamount: state.flightdetails_reducer.flight_finalamount,
        flight_days: state.flightdetails_reducer.flight_days,
        user_id:state.users.user_id
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({bookflight_action:bookflight_action},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(FlightsTermsAndConditions);