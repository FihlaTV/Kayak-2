import React,{ Component } from 'react';
import './../../images/home.css';
import booknow from './../../images/booknow.jpg';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {bookcar_action} from './../../actions/car_action';


class TermsAndConditions extends Component {
  constructor(props){
    super(props);
      this.state = {
          car_price: '200',
          days: '2',
          finalamount:''
      };
    this.handleView = this.handleView.bind(this);
  }

    componentWillMount()
    {
        this.setState({
            car_price: this.props.data.car_price,
            days: this.props.car_days.days
        });
    }

  handleView(data){
      var today = new Date();
      var hh = today.getHours();
      var mn = today.getMinutes();
      var ss = today.getSeconds();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      var booking = yyyy+"/"+mm+"/"+dd +" "+ hh +":"+ mn+":"+ss;
      const {car_price}=this.state;
      const {days}=this.state;
      const totalprice_days = car_price * days;
      const totaltax_days= this.props.car_days.days*10;
      const finalamount= totalprice_days+totaltax_days;
      const payload={
          user_id:this.props.user_id.result,
          car_src_city:this.props.current_car.car_src_city,
          car_destination_city:this.props.current_car.car_destination_city,
          car_rental_agency:this.props.current_car.car_rental_agency,
          car_name:this.props.current_car.car_name,
          start_date:this.props.car_days.start_date,
          end_date:this.props.car_days.end_date,
          booking_amount:finalamount,
          booking_date:booking
      };
      this.props.bookcar_action(payload);

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
            <input type ="image" onClick ={() => this.handleView(this.props.current_car)} src = {booknow} style={{height : 30}}/>

        </div>

           );
  }
}

function mapStateToProps(state) {
  console.log("mapping state to props in booking "+state.cardetails_reducer.current_car.agency);
  return {
      current_car:state.cardetails_reducer.current_car,
      car_finalamount: state.cardetails_reducer.car_finalamount,
      car_days:state.cardetails_reducer.car_days,
      user_id:state.users.user_id
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({bookcar_action:bookcar_action},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TermsAndConditions);

