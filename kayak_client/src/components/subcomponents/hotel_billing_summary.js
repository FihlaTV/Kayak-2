import React,{ Component } from 'react';
import './../../images/subcomponent.css';
import {connect} from 'react-redux';

class hotelBillingSummary extends Component {

    render() {

        return (
            <div className="hotel-billing-summary">
                <div className="car-summary" >
                    <div className="car-summary-1">
                        <h4>Summary</h4>
                        <hr/>
                        <h6>{this.props.hotel_days.hotelfromdate} - {this.props.hotel_days.hoteltodate}({this.props.hotel_days.days}night/s)</h6>
                        <hr/>
                    </div >
                    <div className="car-summary-2">
                        <div>
                            <h5> Charges</h5>
                            <h5>{this.props.current_hotel.hotel_room_type}</h5>
                            <h5>${this.props.hotel_finalamount.hotel_price}</h5>
                            <hr/>
                        </div>

                        <div>
                            <h5>Tax and Fees: ${this.props.hotel_finalamount.hotel_tax} </h5>
                            <hr/>
                        </div>

                        <div>
                            <h5>Total cost: <b style={{fontSize:20}}>${this.props.hotel_finalamount.booking_amount}</b></h5>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log("hiii"+state.hoteldetails_reducer.hotel_days.days);
    return {
        hotel_days: state.hoteldetails_reducer.hotel_days,
        current_hotel:state.hoteldetails_reducer.current_hotel,
        hotel_finalamount:state.hoteldetails_reducer.hotel_finalamount
    };

}

export default connect(mapStateToProps,null)(hotelBillingSummary);