import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import AdminDashboardHeader from './../headers/admin_dashboard_header';
import './../../images/admin.css';
import {handleHotelUpdate} from './../../api/adminAPI';

class EditHotelForm extends Component {

    constructor(){
        super();
        this.hotel_edit_data ={};
    }
    render() {

        this.hotel_edit_data = this.props.current_hotel_edit;
        return (
            <div className = "add-hotel-admin">

                <div className="admin-dashboard-header">
                    <AdminDashboardHeader/>
                </div>

                <div className = "add-hotel-admin-body">
                    <h2 style = {{marginLeft:"43%"}}>Edit Hotel</h2>
                    <hr/>
                    <div style={{diplay:"block-inline", margin:"3%",marginLeft:"250px",marginTop:"44px", height:"395px", width:"400px", float:"left"}}>
                    <label>Hotel name</label>
                    <input type="text" style={{width:400}} className="form-control" id="hotel_name"  defaultValue={this.props.current_hotel_edit.hotel_name} size="35"
                           onChange={(hotel_name) => {this.hotel_edit_data.hotel_name = hotel_name.target.value}}/>
                    <br></br>
                    <label>Hotel address</label>
                    <input type="text" style={{width:400}} className="form-control" id="hotel_address"  defaultValue={this.props.current_hotel_edit.hotel_address} size="35"
                           onChange={(hotel_address) => {this.hotel_edit_data.hotel_address = hotel_address.target.value}}/>
                    <br></br>
                    <label>Hotel city</label>
                    <input type="text" style={{width:400}} className="form-control" id="hotel_city"  defaultValue={this.props.current_hotel_edit.hotel_city} size="35"
                           onChange={(hotel_city) => {this.hotel_edit_data.hotel_city = hotel_city.target.value}}/>
                    <br></br>
                    <label>Hotel state</label>
                    <input type="text" style={{width:400}} className="form-control" id="hotel_state"  defaultValue={this.props.current_hotel_edit.hotel_state} size="35"
                           onChange={(hotel_state) => {this.hotel_edit_data.hotel_state = hotel_state.target.value}}/>
                    <br></br>
                    <label>Hotel zip</label>
                    <input type="text" style={{width:400}} className="form-control" id="hotel_zip"  defaultValue={this.props.current_hotel_edit.hotel_zip} size="35"
                           onChange={(hotel_zip) => {this.hotel_edit_data.hotel_zip = hotel_zip.target.value}}/>
                    <br></br>
                    <label>Hotel stars</label>
                    <input type="text" style={{width:400}} className="form-control" id="hotel_stars"  defaultValue={this.props.current_hotel_edit.hotel_stars} size="35"
                           onChange={(hotel_stars) => {this.hotel_edit_data.hotel_stars = hotel_stars.target.value}}/>
                    <br></br>
                    </div>

                    <div style={{display:"block-inline", margin:"3%" , height:"400px", width:"400px", marginTop:"45px", float:"left"}}>
                    <label>Hotel rating</label>
                    <input type="text" style={{width:400}} className="form-control" id="hotel_rating"  defaultValue={this.props.current_hotel_edit.hotel_rating} size="35"
                           onChange={(hotel_rating) => {this.hotel_edit_data.hotel_rating = hotel_rating.target.value}}/>

                    <br></br>
                    <label>Hotel capacity</label>
                    <input type="text" style={{width:400}} className="form-control" id="hotel_capacity"  defaultValue={this.props.current_hotel_edit.hotel_capacity} size="35"
                           onChange={(hotel_capacity) => {this.hotel_edit_data.hotel_capacity = hotel_capacity.target.value}}/>

                    <br></br>
                    <label>Hotel base price in $</label>
                    <input type="text" style={{width:400}} className="form-control" id="hotel_price"  defaultValue= {this.props.current_hotel_edit.hotel_price} size="35"
                           onChange={(hotel_price) => {this.hotel_edit_data.hotel_price = hotel_price.target.value}}/>

                    <br></br>

                    <button onClick ={() => this.props.handleHotelUpdate(this.hotel_edit_data)} type="submit" className="btn btn-primary" style={{width:150}}>Update</button>

                </div>

                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("maps to props  hotel edit form :"+state.admin_reducer.current_hotel_edit);
    return {
        current_hotel_edit: state.admin_reducer.current_hotel_edit,
    };

}

function mapDispatchToProps(dispatch) {
    console.log("updated hotel data : ",this.hotel_edit_data );
    return bindActionCreators({handleHotelUpdate:handleHotelUpdate},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EditHotelForm);
