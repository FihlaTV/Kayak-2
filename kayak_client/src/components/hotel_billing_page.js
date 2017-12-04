import React,{ Component } from 'react';
import HomePageHeader from './headers/homepage_header';
import HomePageHeader1 from './headers/homepage_header1';
import GuestDetails from './subcomponents/hotel_guest_details'
import { connect } from 'react-redux';
//import BookFasterNextTime from './subcomponents/book_faster_next_time';
//import BillingInformation from './subcomponents/billing_information'
//import HotelBillingSummary from './subcomponents/hotel_billing_summary';
import HotelTermsAndConditions from './subcomponents/hotel_tnc'
import HotelDetails from './subcomponents/hotel_details'
import HotelSummary from './subcomponents/hotel_billing_summary'
import HomeHeader1 from './headers/homepage_header1';
import RenderDetails from './subcomponents/render_details';
import BillingInformation from './subcomponents/billing_information'

import './../images/subcomponent.css';

class HotelBillingPage extends Component {


    render() {
        const divToShow  =
            ((this.props.user_id.result)?<HomePageHeader1/>:<HomePageHeader/>);
        console.log("It will render flight billing page:");
        return (
            <div className="background2">
            <div className="flight-billing-page">
                <div className="flight-billing-page-header">
                    {divToShow}
                </div>

                <div className = "flight-billing-body">
                    <div className ="hotel-billing-body-left-nav" >

                    </div>

                    <div className ="hotel-billing-body-centre">
                        <HotelDetails/>
                        <RenderDetails/>
                        <BillingInformation/>
                        <HotelTermsAndConditions/>
                    </div>

                    <div className ="hotel-billing-body-right-nav">
                        <HotelSummary/>
                    </div>
                </div>

            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user_id:state.users.user_id

    };

}

export default connect(mapStateToProps,null)(HotelBillingPage);

