import React,{ Component } from 'react';
import AdminDashboardHeader from './../headers/admin_dashboard_header';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import './../../images/admin.css';
import {handleCarUpdate} from './../../api/adminAPI';

class EditCarForm extends Component {

    constructor(){
        super();
        this.car_edit_data ={};
    }

    render() {
        this.car_edit_data = this.props.current_car_edit;
        return (
            <div className = "add-hotel-admin">
                <div className="admin-dashboard-header">
                    <AdminDashboardHeader/>
                </div>

                <div className = "add-hotel-admin-body">
                    <h2 style = {{marginLeft:"43%"}}>Edit Car</h2>
                    <hr/>

                    <div style={{diplay:"block-inline", margin:"3%",marginLeft:"250px",marginTop:"44px", height:"395px", width:"400px", float:"left"}}>
                    <label>Car Name</label>
                    <input type="text" style={{width:400}} className="form-control" id="name"  defaultValue={this.props.current_car_edit.car_name} size="35"
                           onChange={(car_name) => {this.car_edit_data.car_name = car_name.target.value}}/>
                    <br></br>
                    <label>Car Capacity</label>
                    <input type="text" style={{width:400}} className="form-control" id="capacity"  defaultValue={this.props.current_car_edit.car_capacity} size="35"
                           onChange={(car_capacity) => {this.car_edit_data.car_capacity = car_capacity.target.value}}/>
                    <br></br>
                    <label>Number of Bags</label>
                    <input type="text" style={{width:400}} className="form-control" id="no_of_bags"  defaultValue={this.props.current_car_edit.car_no_of_bags} size="35"
                           onChange={(car_no_of_bags) => {this.car_edit_data.car_no_of_bags = car_no_of_bags.target.value}}/>
                    <br></br>

                    <label>Number of Doors</label>
                    <input type="text" style={{width:400}} className="form-control" id="no_of_doors"  defaultValue={this.props.current_car_edit.car_no_of_doors}size="35"
                           onChange={(car_no_of_doors) => {this.car_edit_data.car_no_of_doors = car_no_of_doors.target.value}}/>
                    <br></br>
                    </div>

                    <div style={{display:"block-inline", margin:"3%" , height:"400px", width:"400px", marginTop:"45px", float:"left"}}>
                    <label>Source City</label>
                    <input type="text" style={{width:400}} className="form-control" id="src_city"  defaultValue={this.props.current_car_edit.car_src_city} size="35"
                           onChange={(car_src_city) => {this.car_edit_data.car_src_city = car_src_city.target.value}}/>
                    <br></br>
                    <label>Destination City</label>
                    <input type="text" style={{width:400}} className="form-control" id="destination_city"  defaultValue={this.props.current_car_edit.car_destination_city} size="35"
                           onChange={(car_destination_city) => {this.car_edit_data.car_destination_city = car_destination_city.target.value}}/>
                    <br></br>

                    <label>Rental Agency</label>
                    <input type="text" style={{width:400}} className="form-control" id="rental_agency"  defaultValue={this.props.current_car_edit.car_rental_agency} size="35"
                           onChange={(car_rental_agency) => {this.car_edit_data.car_rental_agency = car_rental_agency.target.value}}/>

                    <br></br>
                    <label>Car base price in $</label>
                    <input type="text" style={{width:400}} className="form-control" id="price"  defaultValue={this.props.current_car_edit.car_price} size="35"
                           onChange={(car_price) => {this.car_edit_data.car_price = car_price.target.value}}/>

                    <br></br>

                    <button onClick ={() => this.props.handleCarUpdate(this.car_edit_data)}  type="submit" className="btn btn-primary" style={{width:150}}>Edit</button>
                    </div>
                </div>



            </div>
        );
    }
}


function mapStateToProps(state) {
    console.log("maps to props  car edit form :"+state.admin_reducer.current_car_edit);
    return {
        current_car_edit: state.admin_reducer.current_car_edit,
        user_id:state.users.user_id
    };

}

function mapDispatchToProps(dispatch) {
    console.log("updated car data : ",this.car_edit_data );
    return bindActionCreators({handleCarUpdate:handleCarUpdate},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCarForm);
