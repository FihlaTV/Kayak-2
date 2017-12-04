import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {handleHotelSearch} from './../api/adminAPI';
import EditHotelTile from './searchbars/edithotel_tiles';
import AdminDashboardHeader from './headers/admin_dashboard_header';
import './../images/home.css';

class EditHotels extends Component {
    constructor(){
        super();
        this.searchhotel ={}
    }


    render() {
        console.log("It will display list of hotels searched by the user");
        return (
            <div>
                <div>
                    <AdminDashboardHeader/>
                </div>

                <div className = "hotel-details-body">
                    <div style = {{marginLeft:"40%"}}>
                        <input type="text" class="form-control" style={{width:"300px"}} placeholder="Hotel ID" id="hotel_id" onChange={(hotel_id) => {this.searchhotel.hotel_id = hotel_id.target.value}}/>
                        <strong style={{marginLeft:"17%"}}> OR  </strong>
                        <input type="text" class="form-control" style={{width:"300px"}} placeholder="Hotel Name" id="hotel_name" onChange={(hotel_name) => {this.searchhotel.hotel_name = hotel_name.target.value}}/>
                        <button  type="button" className="btn btn-primary" style={{marginTop:"10px", marginLeft:"14%"}} onClick ={() => this.props.handleHotelSearch(this.searchhotel)} ><strong>Search</strong></button>
                    </div>
                    <br></br>
                    <div className ="hotel-details-body-left-nav">

                    </div>

                    <div className ="hotel-details-body-centre">

                        {this.props.listOfSearchedHotels.map((hotel)=>{
                            return (<EditHotelTile data={hotel} style={{paddingTop:10}}/>)
                        })}
                    </div>
                    <div className ="hotel-details-body-right-nav">

                    </div>
                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({handleHotelSearch:handleHotelSearch},dispatch);
}

function mapStateToProps(state){
    console.log("Edit hotels mapStateToProps: "+state.admin_reducer.listOfSearchedHotels);
    return{
        listOfSearchedHotels: state.admin_reducer.listOfSearchedHotels,
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(EditHotels);
