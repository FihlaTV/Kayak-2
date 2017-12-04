import React,{ Component } from 'react';
import './../../images/home.css';
import booknow from './../../images/booknow.jpg';
import { connect } from 'react-redux';
import {bookhotel_action} from './../../actions/hotel_action';
import {bindActionCreators} from 'redux';
class HotelTermsAndConditions extends Component {
    constructor(props) {
        super(props);
        this.handleView = this.handleView.bind(this);

    }
    handleView()
    {
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
            hotel_city:this.props.current_hotel.hotel_city,
            hotel_name:this.props.current_hotel.hotel_name,
            hotel_id:this.props.current_hotel.hotel_id,
            start_date:this.props.hotel_days.start_date,
            end_date:this.props.hotel_days.end_date,
            booking_amount:this.props.hotel_finalamount.booking_amount,
            booking_date:booking
        };
        this.props.bookhotel_action(payload);
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
                <input type ="image" onClick ={() => this.handleView(this.props.current_hotel)} src = {booknow} style={{height : 30}}/>

            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
        current_hotel:state.hoteldetails_reducer.current_hotel,
        hotel_finalamount: state.hoteldetails_reducer.hotel_finalamount,
        hotel_days:state.hoteldetails_reducer.hotel_days,
        user_id:state.users.user_id
    };

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({bookhotel_action:bookhotel_action},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(HotelTermsAndConditions);