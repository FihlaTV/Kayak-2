import React,{ Component } from 'react';
import './../../images/home.css';
import carIcon from './../../images/carsample.jpg';
import userIcon from './../../images/user1.png';
import baggageIcon from './../../images/car_baggage.png';
import cardoorIcon from './../../images/car_door.png';
import { connect } from 'react-redux';

class ViewCar extends Component {


  render() {
    return (
              <div className="view-car">
                  <div className="view-car-top-div">
                    <h3>Now book your car with: {this.props.data.car_rental_agency}</h3>
                  </div>
                  <hr></hr>
                  <div className="view-car-bottom-div">
                            <div className = "view-car-left-div">
                                <div className ="view-car-cardetails1">
                                    <strong style={{fontSize : 17}}>{this.props.data.car_type}({this.props.data.car_name} or similar)</strong><br></br>
                                    With Air-conditioning<br></br>
                                    {this.props.car_days.carfromdate} to {this.props.car_days.cartodate} ({this.props.car_days.days} days)
                                </div>

                                <div className ="view-car-cardetails2" style={{float:"left",width:"100%"}}>
                                    <img src = {userIcon}/> {this.props.data.car_capacity} People
                                    <img src = {baggageIcon} style={{padding:10}}/> {this.props.data.car_no_of_bags} Bag
                                    <img src = {cardoorIcon} style={{padding:10}}/> {this.props.data.car_no_of_doors} Doors
                                </div>

                            </div>

                            <div className = "view-car-right-div ">
                              <img className="image img-responsive" src={carIcon}/>
                            </div>
                  </div>
              </div>

           );
  }
}
function mapStateToProps(state) {
    console.log("hiii"+state.cardetails_reducer.car_days);
    return {
        car_days: state.cardetails_reducer.car_days,
    };

}
export default connect(mapStateToProps,null)(ViewCar);
