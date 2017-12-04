import React,{ Component } from 'react';
import './../../images/home.css';
import { connect } from 'react-redux';
import carIcon from './../../images/carsample.jpg'
import viewDeal from './../../images/viewdeal.png'
import userIcon from './../../images/user1.png';
import baggageIcon from './../../images/car_baggage.png';
import cardoorIcon from './../../images/car_door.png';
import foxIcon from './../../images/fox.png';
import {history} from './../../utils/util.js';
import {bindActionCreators} from 'redux';
import {currentcar_action} from './../../actions/car_action';
class CarTile extends Component {
    constructor(props) {
        super(props);
        this.handleView = this.handleView.bind(this);
    }
  handleView(data){
this.props.currentcar_action(data);
history.push('./carbillingpage');
  }

  render() {
    return (
      <div className="tile">
          <div className="tiled1">
                  <div className="tiled1-img-pane" style={{float:"left",width:"100%"}}>
                      <h1>{this.props.data.car_type}</h1>
                      <h5 style ={{color:"grey"}}>{this.props.data.car_name} or similar car</h5>
                      <img src = {userIcon}/>Seats: {this.props.data.car_capacity}
                      <img src = {baggageIcon} style={{padding:10}}/>Luggage: {this.props.data.car_no_of_bags}
                      <img src = {cardoorIcon} style={{padding:10}}/>Doors: {this.props.data.car_no_of_doors}
                  </div>
                  <div style={{width:"100%"}}>
                      <div className="car-agency-image">
                          <img src = {foxIcon} />
                      </div>

                      <div className="car-des-name" >

                         <span style={{fontSize:15,marginLeft:8,marginRight:8}}>  &nbsp;{this.props.data.car_src_city} </span><br/>
                         <span style={{fontSize:15,marginLeft:8,marginRight:8}}>  &nbsp;{this.props.data.car_destination_city} </span>
                      </div>
                  </div>
           </div>

          <div className="tiled2" style={{float:"center"}}>
              <div style={{marginTop:"10%", marginBottom:5}}>
                  <span style={{color:"grey"}}>Pay Later</span> - <span style={{color:"green"}}>Free Cancellation</span>
                  <img  className="car-img img-responsive" src={carIcon}/>
              </div>
          </div>

          <div className="tiled3">
              <strong style={{fontSize:25,color:"black"}}>${this.props.data.car_price}</strong>
              <h4>Total</h4>
              <h5 style={{color:"grey",marginTop:"15%"}}>Kayak</h5>
              <img src={viewDeal} style={{width:"100%",marginTop:"2%"}}
              onClick ={() => this.handleView(this.props.data)}/>
          </div>
      </div>
          );
  }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({currentcar_action:currentcar_action},dispatch);
}
export default connect(null,mapDispatchToProps)(CarTile);
