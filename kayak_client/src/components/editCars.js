import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {handleCarSearch} from './../api/adminAPI';
import EditCarTile from './searchbars/editcar_tiles';
import AdminDashboardHeader from './headers/admin_dashboard_header';

class EditCars extends Component {
    constructor(){
        super();
        this.searchcar ={}
    }


    render() {
        console.log("It will display list of cars searched by the admin :this.searchflight",this.searchflight);
        return (
            <div>
                <div>
                    <AdminDashboardHeader/>
                </div>

                <div className = "car-details-body">
                    <div style = {{marginLeft:"40%"}}>
                        <input type="text" className="form-control" style={{width: "300px"}} placeholder="Car Model No" id="car_model_no" onChange={(car_model_no) => {this.searchcar.car_model_no = car_model_no.target.value}}/>
                        <strong style={{marginLeft:"17%"}}> OR  </strong>
                        <input type="text" className="form-control" style={{width: "300px"}} placeholder="Car Name" id="car_name" onChange={(car_name) => {this.searchcar.car_name = car_name.target.value}}/>
                        <button type="button" className="btn btn-primary" style={{marginTop:"10px",marginLeft:"14%"}} onClick ={() => this.props.handleCarSearch(this.searchcar)} ><strong>Search</strong></button>
                    </div>
                    <div className ="car-details-body-left-nav">

                    </div>
                    <div className ="car-details-body-centre">
                        {this.props.listOfSearchedCars.map((car)=>{
                            return (<EditCarTile data={car} style={{paddingTop:10}}/>)
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
    return bindActionCreators({handleCarSearch:handleCarSearch},dispatch);
}

function mapStateToProps(state){
    console.log("Edit cars mapStateToProps: "+state.admin_reducer.listOfSearchedCars);
    return{
        listOfSearchedCars: state.admin_reducer.listOfSearchedCars,
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCars);
