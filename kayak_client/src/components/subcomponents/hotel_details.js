import React,{ Component } from 'react';
import './../../images/home.css';
import './../../images/hotel.css';
import { connect } from 'react-redux';
class HotelDetails extends Component {


    render() {
        return (
            <div className="hotel-details">
                <div>
                    <h3>Hotel is being booked</h3>
                    <hr/>
                </div>
                <div className="flight-departure-return-text">
                    <strong>{this.props.current_hotel.hotel_name}</strong><br/>
                    Situated At: {this.props.current_hotel.hotel_address}, {this.props.current_hotel.hotel_city}, {this.props.current_hotel.hotel_state}, {this.props.current_hotel.hotel_zip}<br/>
                    Price:{this.props.current_hotel.hotel_price}<br/>
                    Rating:{this.props.current_hotel.hotel_rating}<br/>
                    Check in:{this.props.hotel_days.hotelfromdate}<br/>
                    Check out:{this.props.hotel_days.hoteltodate}<br/>
                    <br></br>
                    </div>
                <div className="">
                    <div className = "hotel-details-div1">
                        ->Air-conditioned<br></br>  ->Bar/Lounge<br></br>  ->Fitness center<br></br>  ->Internet<br></br>
                    </div>

                    <div className = "hotel-details-div2">
                        ->Smoking Outside<br></br>   ->Parking<br></br>   ->Restaurant<br></br>   ->Room service<br></br>
                    </div>
                </div>
            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
        current_hotel: state.hoteldetails_reducer.current_hotel,
        hotel_days:state.hoteldetails_reducer.hotel_days
    };

}
export default connect(mapStateToProps,null)(HotelDetails);