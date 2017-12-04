import React,{ Component } from 'react';
import AdminDashboardHeader from './../headers/admin_dashboard_header';
import './../../images/admin.css';

class EditPreferenceForm extends Component {

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
                  <h2>Edit Preference</h2>
                  <hr/>
                  

                  <label>First name</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_name"  placeholder={this.props.data[0].first_name} size="35"/>
                  <br></br>
                  <label>First name</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_address"  placeholder={this.props.data[0].second_name} size="35"/>
                  <br></br>
                  <label>Gender</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_city"  placeholder={this.props.data[0].gender} size="35"/>
                  <br></br>
                  <label>Email</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_state"  placeholder={this.props.data[0].email} size="35"/>
                  <br></br>
                  <label>Address</label>
                  <input type="text" style={{width:400}} className="form-control" id="hotel_zip"  placeholder={this.props.data[0].address} size="35"/>
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



export default EditPreferenceForm;