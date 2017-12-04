import React,{ Component } from 'react';
import AdminDashboardHeader from './../headers/admin_dashboard_header';
import './../../images/admin.css';
import { connect } from 'react-redux';
import {handleFlightUpdate} from './../../api/adminAPI';
import {bindActionCreators} from 'redux';

class EditFlightForm extends Component {

    constructor(){
        super();
        this.flight_edit_data ={};
    }

    render() {
        this.flight_edit_data = this.props.current_flight_edit;
        return (
            <div className = "add-hotel-admin">

                <div className="admin-dashboard-header">
                    <AdminDashboardHeader/>
                </div>

                <div className = "add-hotel-admin-body">
                    <h2 style = {{marginLeft:"43%"}}>Edit Flight</h2>
                    <hr/>

                    <div style={{diplay:"block-inline", margin:"3%",marginLeft:"250px",marginTop:"44px", height:"395px", width:"400px", float:"left"}}>
                    <label>Flight Carrier</label>
                    <input type="text" style={{width:400}} className="form-control" id="flight_carrier_name"  defaultValue={this.props.current_flight_edit.flight_carrier_name} size="35"
                           onChange={(flight_carrier_name) => {this.flight_edit_data.flight_carrier_name = flight_carrier_name.target.value}}/>
                    <br></br>
                    <label>Operation day</label>
                    <input type="text" style={{width:400}} className="form-control" id="flight_operational_day"  defaultValue={this.props.current_flight_edit.flight_operational_day} size="35"
                           onChange={(flight_operational_day) => {this.flight_edit_data.flight_operational_day = flight_operational_day.target.value}}/>
                    <br></br>
                    <label>Departure Time</label>
                    <input type="text" style={{width:400}} className="form-control" id="flight_departure_time"  defaultValue={this.props.current_flight_edit.flight_departure_time} size="35"
                           onChange={(flight_departure_time) => {this.flight_edit_data.flight_departure_time = flight_departure_time.target.value}}/>
                    <br></br>
                    <label>Duration in minutes</label>
                    <input type="text" style={{width:400}} className="form-control" id="flight_duration"  defaultValue={this.props.current_flight_edit.flight_duration} size="35"
                           onChange={(flight_duration) => {this.flight_edit_data.flight_duration = flight_duration.target.value}}/>
                    <br></br>
                    </div>

                    <div style={{display:"block-inline", margin:"3%" , height:"400px", width:"400px", marginTop:"45px", float:"left"}}>
                    <label>Source City</label>
                    <input type="text" style={{width:400}} className="form-control" id="flight_src_city" defaultValue={this.props.current_flight_edit.flight_src_city} size="35"
                           onChange={(flight_src_city) => {this.flight_edit_data.flight_src_city = flight_src_city.target.value}}/>
                    <br></br>
                    <label>Destination City</label>
                    <input type="text" style={{width:400}} className="form-control" id="flight_destination_city"  defaultValue={this.props.current_flight_edit.flight_destination_city} size="35"
                           onChange={(flight_destination_city) => {this.flight_edit_data.flight_destination_city = flight_destination_city.target.value}}/>
                    <br></br>

                    <label>Base price in $</label>
                    <input type="text" style={{width:400}} className="form-control" id="flight_price"  defaultValue={this.props.current_flight_edit.flight_price} size="35"
                           onChange={(flight_price) => {this.flight_edit_data.flight_price = flight_price.target.value}}/>

                    <br></br>

                    <button onClick ={() => this.props.handleFlightUpdate(this.flight_edit_data)}  type="submit" className="btn btn-primary" style={{width:150}}>Edit</button>

                </div>
                </div>


            </div>
        );
    }
}


function mapStateToProps(state) {
    console.log("maps to props  flight edit form :"+state.admin_reducer.current_flight_edit);
    return {
        current_flight_edit: state.admin_reducer.current_flight_edit,
    };

}

function mapDispatchToProps(dispatch) {
    console.log("updated car data : ",this.flight_edit_data );
    return bindActionCreators({handleFlightUpdate:handleFlightUpdate},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EditFlightForm);
