import React,{ Component } from 'react';
import './../../images/home.css';
//import CustomCheckbox from './../subcomponents/custom/custom_checkbox';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setCarConfig} from './../../actions/car_action';

class CarSearchLeftNav extends Component{

    handlePriceSlide(slidevalue){
        console.log("slidevalue:",slidevalue);
        let config = Object.assign({},this.props.leftNavCarConfig);
        config.car_price = slidevalue;
        this.props.setCarConfig(config);
    }

    handleDoorSlide(slidevalue){
        console.log("slidevalue:",slidevalue);
        let config = Object.assign({},this.props.leftNavCarConfig);
        config.car_no_of_doors = slidevalue;
        this.props.setCarConfig(config);
    }

    handleSeatsSlide(slidevalue){
        console.log("slidevalue:",slidevalue);
        let config = Object.assign({},this.props.leftNavCarConfig);
        config.car_capacity = slidevalue;
        this.props.setCarConfig(config);
    }

    handleLuggageSlide(slidevalue){
        console.log("slidevalue:",slidevalue);
        let config = Object.assign({},this.props.leftNavCarConfig);
        config.car_no_of_bags = slidevalue;
        this.props.setCarConfig(config);
    }
    render() {
        console.log("Search leftnav Bar Page Render",this.props.leftNavCarConfig);
        return (
            <div  style={{margin:12}}>

                <div className="car-left-nav-slider" >
                    <p> Seats: {this.props.leftNavCarConfig.car_capacity} </p>
                    <input type="range" min="2" max="8" defaultValue={this.props.leftNavCarConfig.car_capacity}
                           onChange={(slidevalue)=>{this.handleSeatsSlide(slidevalue.target.value)}}/>
                </div>
                <div className="car-left-nav-slider" >
                    <p> Doors: {this.props.leftNavCarConfig.car_no_of_doors} </p>
                    <input type="range" min="1" max="5" defaultValue={this.props.leftNavCarConfig.car_no_of_doors}
                           onChange={(slidevalue)=>{this.handleDoorSlide(slidevalue.target.value)}}/>
                </div>
                <div className="car-left-nav-slider" >
                    <p> Luggage: {this.props.leftNavCarConfig.car_no_of_bags} </p>
                    <input type="range" min="2" max="10" defaultValue={this.props.leftNavCarConfig.car_no_of_bags}
                           onChange={(slidevalue)=>{this.handleLuggageSlide(slidevalue.target.value)}}/>
                </div>
                <div className="car-left-nav-slider" >
                    <p> Price: ${this.props.leftNavCarConfig.car_price} </p>
                    <input type="range" min="10" max="1000" defaultValue={this.props.leftNavCarConfig.car_price}
                           onChange={(slidevalue)=>{this.handlePriceSlide(slidevalue.target.value)}}/>
                </div>

            </div>

        );
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps car-left-nav 1111",state.cardetails_reducer.leftNavCarConfig);
    return {
        leftNavCarConfig : state.cardetails_reducer.leftNavCarConfig
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({setCarConfig:setCarConfig}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(CarSearchLeftNav);
