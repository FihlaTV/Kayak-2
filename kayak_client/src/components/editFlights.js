import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import EditFlightTile from './searchbars/editflight_tiles';
import AdminDashboardHeader from './headers/admin_dashboard_header';
import {handleFlightSearch} from './../api/adminAPI';
import './../images/flight.css';
import './../images/home.css';


class EditFlights extends Component {

    constructor(){
        super();
        this.searchflight ={}
    }


    render() {
        console.log("It will display list of flights searched by the admin");
        return (
            <div>
                <div>
                    <AdminDashboardHeader/>
                </div>

                <div className = "car-details-body">
                    <div style = {{marginLeft:"40%"}}>
                        <input  type="text" className="form-control" style={{width:"300px"}} placeholder="Flight Id" id="flight_id" onChange={(flight_id) => {this.searchflight.flight_id = flight_id.target.value}}/>
                        <strong style={{marginLeft:"17%"}}> OR  </strong>
                        <input  type="text" className="form-control" style={{width:"300px"}} placeholder="Carrier Name" id="flight_carrier_name" onChange={(flight_carrier_name) => {this.searchflight.flight_carrier_name = flight_carrier_name.target.value}}/>
                        <button  type="button" className="btn btn-primary" style={{marginTop:"10px", marginLeft:"14%"}} onClick ={() => this.props.handleFlightSearch(this.searchflight)} ><strong>Search</strong></button>
                    </div>
                    <div className ="car-details-body-left-nav">

                    </div>
                    <div className ="car-details-body-centre">
                        {this.props.listOfSearchedFlights.map((flight)=>{
                            return (<EditFlightTile data={flight} style={{paddingTop:10}}/>)
                        })}
                    </div>
                    <div className ="car-details-body-right-nav">

                    </div>
                </div>

            </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({handleFlightSearch:handleFlightSearch},dispatch);
}

function mapStateToProps(state){
    console.log("Edit flights mapStateToProps: "+state.admin_reducer.listOfSearchedFlights);
    return{
        listOfSearchedFlights: state.admin_reducer.listOfSearchedFlights,
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(EditFlights);
