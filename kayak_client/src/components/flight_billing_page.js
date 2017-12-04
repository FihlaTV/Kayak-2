import React,{ Component } from 'react';
import HomePageHeader from './headers/homepage_header';
import HomePageHeader1 from './headers/homepage_header1';
import FlightDetails from './subcomponents/flight_details';
import TravelDetails from './subcomponents/flight_travel_details';
import FlightTripProtection from './subcomponents/flight_trip_protection'
import BillingInformation from './subcomponents/billing_information'
import FlightBillingSummary from './subcomponents/flight_billing_summary';
import FlightsTermsAndConditions from './subcomponents/flights_tnc';

import { connect } from 'react-redux';

import './../images/subcomponent.css';
import './../images/home.css';

class FlightBillingPage extends Component {


    render() {
        const divToShow  =
            ((this.props.user_id.result)?<HomePageHeader1/>:<HomePageHeader/>);
        return (
            <div className="background">
            <div className="flight-billing-page">
                <div className="flight-billing-page-header">
                    {divToShow}
                </div>
                <div className = "flight-billing-body">
                    <div className ="flight-billing-body-left-nav" >
                    </div>
                    <div className ="flight-billing-body-centre">
                        <FlightDetails data={this.props.current_flight}/>
                        <TravelDetails data={this.props.current_flight}/>
                        <BillingInformation data={this.props.current_flight}/>
                        <FlightsTermsAndConditions data={this.props.current_flight}/>
                    </div>

                    <div className ="flight-billing-body-right-nav">
                        <FlightBillingSummary/>
                    </div>
                </div>

            </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log("hiii"+state.flightdetails_reducer.current_flight);
    return {
        current_flight: state.flightdetails_reducer.current_flight,
        user_id:state.users.user_id
    };

}
export default connect(mapStateToProps,null)(FlightBillingPage);