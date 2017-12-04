import React,{ Component } from 'react';
import AdminDashboardHeader from './../headers/admin_dashboard_header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './../../images/admin.css';
import {addCarAdmin} from './../../api/adminAPI';

class AddCarAdmin extends Component {
    constructor(){
        super();
        this.cardetail ={}
    }


    render() {
        return (
            <div className="admin-background-fixed">
            <div className = "add-car-admin">

              <div className="admin-dashboard-header">
                <AdminDashboardHeader/>
              </div>

              <div className = "add-car-admin-body">
                <h2 style={{marginLeft:"43%"}}>Add Car</h2>
                <hr/>

                <div style={{diplay:"block-inline", margin:"3%",marginLeft:"330px",marginTop:"44px", height:"395px", width:"400px", float:"left"}}>
                  <label>Car Model</label>
                  <input type="text" style={{width:400}} className="form-control" id="car_model"  placeholder="Enter car model" size="35"
                         onChange={(car_model_no) => {this.cardetail.car_model_no = car_model_no.target.value}}/>
                  <br></br>
                  <label>Car Name</label>
                  <input type="text" style={{width:400}} className="form-control" id="car_name"  placeholder="Enter car name" size="35"
                         onChange={(car_name) => {this.cardetail.car_name = car_name.target.value}}/>
                  <br></br>
                  <label>Capacity</label>
                  <input type="text" style={{width:400}} className="form-control" id="capacity"  placeholder="Enter capacity" size="35"
                         onChange={(car_capacity) => {this.cardetail.car_capacity = car_capacity.target.value}}/>
                  <br></br>
                  <label>No. of doors</label>
                  <input type="text" style={{width:400}} className="form-control" id="no_of_doors"  placeholder="Enter the number of doors" size="35"
                         onChange={(car_no_of_doors) => {this.cardetail.car_no_of_doors = car_no_of_doors.target.value}}/>
                  <br></br>
                  <label>No. of Bags</label>
                  <input type="text" style={{width:400}} className="form-control" id="no_of_bags"  placeholder="Enter the number of bags" size="35"
                         onChange={(car_no_of_bags) => {this.cardetail.car_no_of_bags = car_no_of_bags.target.value}}/>
                  <br></br></div>



                <div style={{diplay:"block-inline", margin:"3%" , height:"400px", width:"400px", float:"left"}}>
                  <label>Base price</label>
                  <input type="text" style={{width:400}} className="form-control" id="price"  placeholder="Enter the price" size="35"
                         onChange={(car_price) => {this.cardetail.car_price = car_price.target.value}}/>
                  <br></br>
                  <label>Enter the source city</label>
                  <input type="text" style={{width:400}} className="form-control" id="src_city"  placeholder="Enter the cource city" size="35"
                         onChange={(car_src_city) => {this.cardetail.car_src_city = car_src_city.target.value}}/>
                  <br></br>
                  <label>Enter the destination city</label>
                  <input type="text" style={{width:400}} className="form-control" id="price"  placeholder="Enter the destination city" size="35"
                         onChange={(car_destination_city) => {this.cardetail.car_destination_city = car_destination_city.target.value}}/>
                  <br></br>
                  <label>Select the rental agency</label>
                  <div className="form-group">
                    <select className="form-control" id="rental_agency"  style={{width:400}}
                            onChange={(car_rental_agency) => {this.cardetail.car_rental_agency = car_rental_agency.target.value}}>
                      <option>Select an agency</option>
                      <option>Advantage</option>
                      <option>Alamo</option>
                      <option>Avis</option>
                      <option>Budget</option>
                      <option>Dollar</option>
                      <option>Enterprise</option>
                      <option>Fox</option>
                    </select>
                  </div>

                  <label>Select the car type</label>
                  <div className="form-group">
                    <select className="form-control" id="car_type"  style={{width:400}}
                            onChange={(car_type) => {this.cardetail.car_type = car_type.target.value}}>
                      <option>Select car type</option>
                      <option>SUV</option>
                      <option>Luxury</option>
                      <option>Van</option>
                      <option>Convertible</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{width:150, marginTop:"3%", float:"right"}}
                          onClick={() => this.props.addCarAdmin(this.cardetail)}>Add</button>
                </div>
              </div>
            </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({addCarAdmin:addCarAdmin},dispatch);
}

export default connect(null,mapDispatchToProps)(AddCarAdmin);
