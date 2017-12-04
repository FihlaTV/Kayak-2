// import React,{ Component } from 'react';
// import AdminDashboardHeader from './headers/admin_dashboard_header';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import './../images/home.css';
// import './../images/admin.css';
// import carDashIcon from './../images/admin_dash_car.png';
// import hotelDashIcon from './../images/admin_hotel_dash_1.png';
// import flightDashIcon from './../images/admin_dash_flight.png';
// import userDashIcon from './../images/admin_dash_user.png';
// import {getHotelAnalysis,getCarAnalysis, getFlightAnalysis} from './../api/adminAPI';
// import PieChart from './graph/pie_chart';
// import BarChart from './graph/bar_chart';
//
// class AdminDashboard extends Component {
//
//     getAdminDashBoardGraph(){
//         var data={
//             labels: ["Car Sales", "Flight Sales", "Hotel Sales", "User Booking"],
//             datasets:[this.props.total_sales.car_sales,
//                 this.props.total_sales.flight_sales,
//                 this.props.total_sales.hotel_sales,
//                 this.props.total_sales.user_booking
//             ],
//             labelName:"Sales Overview",
//             header_text:"Sales Overview"
//         }
//         return (<PieChart data={data}/>)
//     }
//
//     render() {
//         console.log("It will render admin dash board page:");
//         return (
//             <div className="admin-background">
//                 <div className="admin-dashboard-header">
//                     <AdminDashboardHeader/>
//                 </div>
//
//                 <div className="admin-dashboard-welcome">
//                     <h2>Welcome to Admin Dashboard</h2>
//                     <hr/>
//                 </div>
//
//                 <div className="admin-dashboard-tiles-div" >
//                     <div className="admin-dashboard-tile-car" onClick={() => this.props.getCarAnalysis({date : "2017"})}>
//                         <div style={{height:"100%"}}>
//                             <div style={{height:"60%"}}>
//                                 <div style={{display:"inline",float:"left", width:"60%"}}>
//                                     <img style={{paddingTop:"12px"}} src={carDashIcon}/>
//                                 </div>
//                                 <div style={{display:"inline",float:"right", width:"40%",height:"100%",paddingTop:40}}>
//                                     <span style={{fontSize:40,textAlign:"center"}}><strong>{this.props.total_sales.car_sales}</strong></span>
//                                 </div>
//                             </div>
//                             <hr/>
//
//                             <div style={{height:"30%"}}>
//                                 <h4>Total cars rented last year</h4>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="admin-dashboard-tile-hotel" onClick={() => this.props.getHotelAnalysis({date : "2017"})}>
//                         <div style={{height:"100%"}}>
//                             <div style={{height:"60%"}}>
//                                 <div style={{display:"inline",float:"left", width:"60%"}}>
//                                     <img src={hotelDashIcon} style={{padding:10}}/>
//                                 </div>
//                                 <div style={{display:"inline",float:"right", width:"40%",height:"100%",paddingTop:40}}>
//                                     <span style={{fontSize:40,textAlign:"center"}}><strong>{this.props.total_sales.hotel_sales}</strong></span>
//                                 </div>
//                             </div>
//                             <hr/>
//
//                             <div style={{height:"30%"}}>
//                                 <h4>Total hotels booked last year</h4>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="admin-dashboard-tile-flight" onClick={() => this.props.getFlightAnalysis({date : "2017"})}>
//                         <div style={{height:"100%"}}>
//                             <div style={{height:"60%"}}>
//                                 <div style={{display:"inline",float:"left", width:"60%"}}>
//                                     <img src={flightDashIcon} style={{padding:10}}/>
//                                 </div>
//                                 <div style={{display:"inline",float:"right", width:"40%",height:"100%",paddingTop:40}}>
//                                     <span style={{fontSize:40,textAlign:"center",color:"#00BFFF"}}><strong>{this.props.total_sales.flight_sales}</strong></span>
//                                 </div>
//                             </div>
//                             <hr/>
//
//                             <div style={{height:"30%"}}>
//                                 <h4 style={{color:"#00BFFF"}}>Total flights sold last year</h4>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="admin-dashboard-tile-users" >
//                         <div style={{height:"100%"}}>
//                             <div style={{height:"60%"}}>
//                                 <div style={{display:"inline",float:"left", width:"60%"}}>
//                                     <img src={userDashIcon} style={{padding:10}}/>
//                                 </div>
//                                 <div style={{display:"inline",float:"right", width:"40%",height:"100%",paddingTop:40}}>
//                                     <span style={{fontSize:40,textAlign:"center"}}><strong>{this.props.total_sales.flight_sales}</strong></span>
//                                 </div>
//                             </div>
//                             <hr/>
//
//                             <div style={{height:"30%"}}>
//                                 <h4>Total users registered last year</h4>
//                             </div>
//                         </div>
//                     </div>
//
//                 </div>
//
//                 <div className="admin-dashboard-welcome">
//                     <h2>A graph showing each city's revenue in the last year-</h2>
//                     <hr/>
//                 </div>
//                 <div className="admin-dashboard-graph">
//                     <div style={{margingBottom:20, display: "inline-block",
//                         border: "1px solid lightgray", height:"450px", width:"90%"}}>
//                         {this.getAdminDashBoardGraph()}
//                     </div>
//                 </div>
//
//                 <div className="admin-dashboard-welcome">
//                     <h2>A representation of hosts with the best selling properties in the last year-</h2>
//                     <hr/>
//                 </div>
//                 <div className="admin-dashboard-graph" style={{width:"auto", marginBottom:"10%",display: "block-inline"}}>
//                     <div style={{paddingBottom:"10%", margingBottom:"10%", display: "block-inline",
//                         border: "1px solid lightgray", height:"420px", width:"1120px"}}>
//                         {/*{this.getAdminDashBoardBarGraph()}*/}
//                         <BarChart/>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({getHotelAnalysis:getHotelAnalysis,
//         getCarAnalysis:getCarAnalysis,
//         getFlightAnalysis:getFlightAnalysis
//     },dispatch);
// }
//
// function mapStateToProps(state){
//     console.log("maps to props admin dashboard:",state.admin_reducer.total_sales);
//     return {
//         total_sales:state.admin_reducer.total_sales
//     };
// }
//
// export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard);

import React,{ Component } from 'react';
import AdminDashboardHeader from './headers/admin_dashboard_header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './../images/home.css';
import './../images/admin.css';
import carDashIcon from './../images/admin_dash_car.png';
import hotelDashIcon from './../images/admin_hotel_dash_1.png';
import flightDashIcon from './../images/admin_dash_flight.png';
import userDashIcon from './../images/admin_dash_user.png';
import {getHotelAnalysis,getCarAnalysis, getFlightAnalysis} from './../api/adminAPI';
import BarChart from './graph/bar_chart';
import LineChart from "./graph/line_chart";

class AdminDashboard extends Component {

    getAdminDashBoardGraph(){
        var data={
            labels: ["Car Sales", "Flight Sales", "Hotel Sales", "User Booking"],
            datasets:[this.props.total_sales.car_sales,
                this.props.total_sales.flight_sales,
                this.props.total_sales.hotel_sales,
                this.props.total_sales.user_booking
            ],
            labelName:"Sales Overview",
            header_text:"Sales Overview"
        }
        return (<LineChart data={data}/>)
    }
    render() {
        console.log("It will render admin dash board page:");
        return (
            <div>
                <div className="admin-dashboard-header">
                    <AdminDashboardHeader/>
                </div>

                <div className="admin-dashboard-welcome">
                    <h2>Welcome to Admin Dashboard</h2>
                    <hr/>
                </div>

                <div className="admin-dashboard-tiles-div" >
                    <div className="admin-dashboard-tile-car" onClick={() => this.props.getCarAnalysis({date : "2017"})}>
                        <div style={{height:"100%"}}>
                            <div style={{height:"60%"}}>
                                <div style={{display:"inline",float:"left", width:"60%"}}>
                                    <img src={carDashIcon}/>
                                </div>
                                <div style={{display:"inline",float:"right", width:"40%",height:"100%",paddingTop:40}}>
                                    <span style={{fontSize:40,textAlign:"center"}}><strong>{this.props.total_sales.car_sales}</strong></span>
                                </div>
                            </div>
                            <hr/>

                            <div style={{height:"30%"}}>
                                <h4>Total cars rented last year</h4>
                            </div>
                        </div>
                    </div>

                    <div className="admin-dashboard-tile-hotel" onClick={() => this.props.getHotelAnalysis({date : "2017"})}>
                        <div style={{height:"100%"}}>
                            <div style={{height:"60%"}}>
                                <div style={{display:"inline",float:"left", width:"60%"}}>
                                    <img src={hotelDashIcon} style={{padding:10}}/>
                                </div>
                                <div style={{display:"inline",float:"right", width:"40%",height:"100%",paddingTop:40}}>
                                    <span style={{fontSize:40,textAlign:"center"}}><strong>{this.props.total_sales.hotel_sales}</strong></span>
                                </div>
                            </div>
                            <hr/>

                            <div style={{height:"30%"}}>
                                <h4>Total hotels rented last year</h4>
                            </div>
                        </div>
                    </div>

                    <div className="admin-dashboard-tile-flight" onClick={() => this.props.getFlightAnalysis({date : "2017"})}>
                        <div style={{height:"100%"}}>
                            <div style={{height:"60%"}}>
                                <div style={{display:"inline",float:"left", width:"60%"}}>
                                    <img src={flightDashIcon} style={{padding:10}}/>
                                </div>
                                <div style={{display:"inline",float:"right", width:"40%",height:"100%",paddingTop:40}}>
                                    <span style={{fontSize:40,textAlign:"center",color:"#00BFFF"}}><strong>{this.props.total_sales.flight_sales}</strong></span>
                                </div>
                            </div>
                            <hr/>

                            <div style={{height:"30%"}}>
                                <h4 style={{color:"#00BFFF"}}>Total flights rented last year</h4>
                            </div>
                        </div>
                    </div>

                    <div className="admin-dashboard-tile-users" >
                        <div style={{height:"100%"}}>
                            <div style={{height:"60%"}}>
                                <div style={{display:"inline",float:"left", width:"60%"}}>
                                    <img src={userDashIcon} style={{padding:10}}/>
                                </div>
                                <div style={{display:"inline",float:"right", width:"40%",height:"100%",paddingTop:40}}>
                                    <span style={{fontSize:40,textAlign:"center"}}><strong>{this.props.total_sales.user_booking}</strong></span>
                                </div>
                            </div>
                            <hr/>

                            <div style={{height:"30%"}}>
                                <h4>Total No of bookings</h4>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="admin-dashboard-graph">
                    <div style={{padding:20,margingBottom:100}}>
                        {this.getAdminDashBoardGraph()}
                    </div>

                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getHotelAnalysis:getHotelAnalysis,
        getCarAnalysis:getCarAnalysis,
        getFlightAnalysis:getFlightAnalysis
    },dispatch);
}

function mapStateToProps(state){
    console.log("maps to props admin dashboard:",state.admin_reducer.total_sales);
    return {
        total_sales:state.admin_reducer.total_sales
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard);
