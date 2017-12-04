import React,{ Component } from 'react';
import {connect} from 'react-redux';
import AdminDashboardHeader from './../headers/admin_dashboard_header';
import './../../images/admin.css';
import PieChart from './../graph/pie_chart';

import './../../images/admin.css';

class CarGraphs extends Component {

  getAdminDashBoardGraph(labels, datasets, label_name, header_text){
    if(labels.length >0 && datasets.length >0){
        var data={
          labels: labels,
          datasets:datasets,
          labelName:label_name,
          header_text:header_text
         }
      return (<PieChart data={data}/>)
    }else{
      return (<h2 style={{color:"red"}}> Analysis data not available </h2>)
    }
}


  render() {
    return (
            <div>

                <div className="admin-dashboard-header">
                  <AdminDashboardHeader/>
                </div>

                <br></br>
                <h3 className="hotel-graph-header">Top 10 car models in terms of sales </h3>
                <div className="car-graph-1">
                    {this.getAdminDashBoardGraph(this.props.car_analysis_data[0]['top_ten_car_sales'].models,this.props.car_analysis_data[0]['top_ten_car_sales'].sales,
                    " Sales Report"," Top 10 car models in terms of sales")}
                </div>
                <br></br>
                <h3 className="hotel-graph-header">Top cities in terms of car sales </h3>
                <div className="car-graph-2">
                  {this.getAdminDashBoardGraph(this.props.car_analysis_data[1]['top_ten_city_sales'].cities,this.props.car_analysis_data[1]['top_ten_city_sales'].sales,
                  " Sales Report"," Cities with maximum sales")}
                </div>
                

            </div>
           );
  }
}



function mapStateToProps(state) {
    console.log("Car graph mapStateToProps:",state.admin_reducer.car_analysis_data);
    return {
        car_analysis_data: state.admin_reducer.car_analysis_data,
    };

}
export default connect(mapStateToProps,null)(CarGraphs);
