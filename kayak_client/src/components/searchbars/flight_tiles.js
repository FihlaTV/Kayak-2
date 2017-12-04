import React,{ Component } from 'react';
import './../../images/home.css';
import { connect } from 'react-redux';
import * as Images from './../../utils/images';
import './../../images/flight.css';
import {history} from './../../utils/util.js';
import {bindActionCreators} from 'redux';
import {currentflight_action,setPrice} from './../../actions/flight_action';
import img from '../../images/logo_flight.png';

class FlightTile extends Component {
  handleView(data){
      this.props.currentflight_action(data);
            console.log("Passengers"+this.props.data.flight_passengers);
          var flight_price=(this.props.data.flight_price)*(this.props.data.flight_passengers);

          this.props.setPrice(flight_price);
      history.push('./flightbillingpage');


  }

  render() {
    return (
      <div className="flight-tile">

          <div className="flight-tile1" style={{paddingTop:"2%"}}>
            <div className="flight-tile-div">
            <img src={img} className="img-responsive"/><br/>
                {this.props.data.flight_carrier_name}
            </div>
            <div className="flight-tile-div">
                {this.props.data.flight_departure_time} <br/>
                {this.props.data.flight_src_city}
            </div>
            <div className="flight-tile-div">
              <span style ={{color:"grey",bold:true}}>____________ <br/> non-stop</span>
            </div>
            <div className="flight-tile-div">
                {this.props.data.flight_landing_time}<br/>
                {this.props.data.flight_destination_city}
            </div>
            <div className="flight-tile-div">
              <span style={{marginLeft:"30%"}}>{this.props.data.flight_duration} hours</span>
            </div>

          </div>
          <div className="flight-tile2">
              <strong style={{fontSize:25,color:"black",marginTop:20}}>${this.props.data.flight_price}</strong>
              <h4>Total</h4>
              <h5 style={{color:"grey",marginTop:"8%"}}>Kayak</h5>
              <img src={Images.getImages().view_deal} style={{width:"80%"}}
              onClick ={() => this.handleView(this.props.data)}/>
          </div>
      </div>
          );
  }
}

function mapStateToProps(state) {
    return {
        flight_finalamount:state.flightdetails.flight_finalamount
    };

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({currentflight_action:currentflight_action,setPrice:setPrice},dispatch);
}
export default connect(null,mapDispatchToProps)(FlightTile);
