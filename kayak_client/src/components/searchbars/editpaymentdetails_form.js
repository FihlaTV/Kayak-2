import React,{ Component } from 'react';
import AdminDashboardHeader from './../headers/admin_dashboard_header';
import './../../images/admin.css';

class EditPaymentDetailsForm extends Component {

 handleSubmit(){
    console.log("Clicked Edit Hotel");
  }
  render() {
    return (
            <div className = "add-hotel-admin">

                <div className="admin-dashboard-header">
                  <AdminDashboardHeader/>
                </div>

                <div className = "add-hotel-admin-body">
                  <h2>Edit Payment detail</h2>
                  <hr/>
                  

                  <label>Name on Card</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_name"  placeholder={this.props.data[0].name_on_card} size="35"/>
                  <br></br>
                  <label>Card Number(last 4 digits)</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_address"  placeholder={this.props.data[0].last_digits} size="35"/>
                  <br></br>
                  <label>Card Type</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_city"  placeholder={this.props.data[0].card_type} size="35"/>
                  <br></br>
                  <label>Address</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_state"  placeholder={this.props.data[0].address} size="35"/>
                  <br></br>
                  <label>City</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_stars"  placeholder={this.props.data[0].city} size="35"/>
                  <br></br>
                 
                  <label>State</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_rating"  placeholder={this.props.data[0].state} size="35"/>

                  <br></br>
                  <label>Zip</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_capacity"  placeholder={this.props.data[0].zip} size="35"/>

                  <br></br>

                  <button onClick ={() => this.handleSubmit()} type="submit" className="btn btn-primary" style={{width:150}}>Submit</button>

                </div>



            </div>
           );
  }
}



export default EditPaymentDetailsForm;