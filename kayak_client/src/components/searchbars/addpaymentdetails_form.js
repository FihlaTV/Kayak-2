import React,{ Component } from 'react';
import AdminDashboardHeader from './../headers/admin_dashboard_header';
import './../../images/admin.css';

class AddPaymentDetailsForm extends Component {

 handleAdd(){
    console.log("Clicked Add Card");
  }
  render() {
    return (
            <div className = "add-hotel-admin">

                <div className="admin-dashboard-header">
                  <AdminDashboardHeader/>
                </div>

                <div className = "add-hotel-admin-body">
                  <h2>Add Payment Detail</h2>
                  <hr/>
                  

                  <label>Name on Card</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_name"  placeholder="Name on Card" size="35"/>
                  <br></br>
                  <label>Card Number(last 4 digits)</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_address"  placeholder="card Number" size="35"/>
                  <br></br>
                  <label>Card Type</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_city"  placeholder="Card Type" size="35"/>
                  <br></br>
                  <label>Address</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_state"  placeholder="Address" size="35"/>
                  <br></br>
                  <label>City</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_stars"  placeholder="City" size="35"/>
                  <br></br>
                 
                  <label>State</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_rating"  placeholder="State" size="35"/>

                  <br></br>
                  <label>Zip</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_capacity"  placeholder="Zip" size="35"/>

                  <br></br>

                  <button onClick ={() => this.handleAdd()} type="submit" className="btn btn-primary" style={{width:150}}>Add</button>

                </div>



            </div>
           );
  }
}



export default AddPaymentDetailsForm;