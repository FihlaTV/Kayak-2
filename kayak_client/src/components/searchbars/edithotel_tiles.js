import React,{ Component } from 'react';
import './../../images/home.css';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import HotelIcon from './../../images/hotelimage.jpg'
import viewDeal from './../../images/viewdeal.png';
import * as adminActions from './../../actions/admin_action';
import {adminHotelDelete} from './../../api/adminAPI';
import {history} from "../../utils/util";

class EditHotelTile extends Component {
    handleEdit(){
        console.log("Hotel edit:",this.props.data);
        this.props.editHotelAdmin(this.props.data);
        history.push('/edithotelform');
    }

    render() {
        console.log("Search leftnav Bar Page");
        return (
            <div className="hotel-tile" style={{marginLeft:"35%"}}>
                <div className="tiled1">
                    <div className="tiled1-img-pane" style={{float:"left",width:"100%",height:100}}>
                        <img  className="hotel-img" src={HotelIcon}/>
                    </div>
                </div>

                <div className="tiled2">
                    <div style={{marginTop:"5%"}}>
                        <span style={{fontSize:20, padding:40}}>{this.props.data.hotel_name}</span><br/>
                    </div>
                    <div style={{width:300}}>

                   <span className="glyphicon glyphicon-star" style={{float: "left",marginLeft:45}}>
                 : {this.props.data.hotel_stars}</span><br/>
                        <div style={{marginTop:30}}>
                            <span style={{marginTop:30,marginLeft:50, backgroundColor: "#00B1E1", color: 'white'}}> {this.props.data.hotel_rating} </span>
                            <span style={{marginTop:30,marginLeft:30}}>{this.props.data.hotel_reviews}   </span>
                            <br></br>
                            <span style={{marginLeft:200,fontSize:12,color: 'grey' }}>Address <br/><div style={{marginLeft:200, fontSize:12,color: 'grey' }}> {this.props.data.hotel_address}, {this.props.data.hotel_city}, {this.props.data.hotel_state} - {this.props.data.hotel_zip} </div></span>


                            <span style={{marginLeft:170}}></span>
                        </div>
                    </div>

                </div>

                <div className="tiled3">
                    <strong style={{fontSize:15,color:"black"}}>Available : {this.props.data.hotel_capacity}</strong><br/>
                    <strong style={{fontSize:25,color:"black"}}>${this.props.data.hotel_price}</strong>
                    <h4>Total</h4>
                    <button className="btn btn-primary" onClick ={() => this.handleEdit()} style={{width:"80%",marginTop:"2%"}}><strong>Edit</strong></button>
                    <button className="btn btn-primary" onClick ={() => this.props.adminHotelDelete({hotel_id:this.props.data.hotel_id},this.props.latest_admin_search_parameter)} style={{width:"80%",marginTop:"2%"}}><strong>Delete</strong></button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        latest_admin_search_parameter: state.hoteldetails_reducer.latest_admin_search_parameter,
    };

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({editHotelAdmin:adminActions.editHotelAdmin,adminHotelDelete:adminHotelDelete},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EditHotelTile);
