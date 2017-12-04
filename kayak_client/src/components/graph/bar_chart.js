// import React, {Component} from 'react';
// import {Bar} from 'react-chartjs-2';
// import {Doughnut} from 'react-chartjs-2';
//
// class BarChart extends Component{
//
//     constructor(){
//         super();
//         this.state={
//             data1:{
//                 labels: [
//                     'United Airlines',
//                     'Delts',
//                     'Hilton Hotels'
//                 ],
//                 datasets: [{
//                     data: [400, 500, 100],
//                     backgroundColor: [
//                         '#FF6384',
//                         '#36A2EB',
//                         '#FFCE56'
//                     ],
//                     hoverBackgroundColor: [
//                         '#FF6384',
//                         '#36A2EB',
//                         '#FFCE56'
//                     ]
//                 }]
//             },
//             data2:{
//                 labels: [
//                     'United Airlines',
//                     'Delts',
//                     'Hilton Hotels'
//                 ],
//                 datasets: [{
//                     data: [100, 200, 500],
//                     backgroundColor: [
//                         '#FF6384',
//                         '#36A2EB',
//                         '#FFCE56'
//                     ],
//                     hoverBackgroundColor: [
//                         '#FF6384',
//                         '#36A2EB',
//                         '#FFCE56'
//                     ]
//                 }]
//             },
//             data3:{
//                 labels: [
//                     'United Airlines',
//                     'Delts',
//                     'Hilton Hotels'
//                 ],
//                 datasets: [{
//                     data: [4, 3, 4],
//                     backgroundColor: [
//                         '#FF6384',
//                         '#36A2EB',
//                         '#FFCE56'
//                     ],
//                     hoverBackgroundColor: [
//                         '#FF6384',
//                         '#36A2EB',
//                         '#FFCE56'
//                     ]
//                 }]
//             }
//
//
//         };
//     }
//
//
//
//     render(){
//         console.log("this.props.data",this.props.data);
//         return (
//             <div className="chart" style={{display:"block-inline", padding:"2%"}}>
//               <div style={{float:"left"}}>
//                 <Doughnut data={this.state.data1}
//                           width="350px"
//                           height="350px"
//                           options={{
//                               maintainAspectRatio: false
//                           }}/>
//               </div>
//               <div style={{float:"left", paddingLeft:"20px"}}>
//                 <Doughnut data={this.state.data2}
//                           width="350px"
//                           height="350px"
//                           options={{
//                               maintainAspectRatio: false
//                           }}/>
//               </div>
//               <div style={{float:"left"}}>
//                 <Doughnut data={this.state.data3}
//                           width="350px"
//                           height="350px"
//                           options={{
//                               maintainAspectRatio: false
//                           }}/>
//               </div>
//             </div>
//
//         )
//     }
// }
//
// export default BarChart;

import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
/*
expected data while creting this component
var data={
    labels: [],
    datasets:[],
    labelName:"Revenue",
    header_text:"Top 10 hotel revenue"
}

*/
class BarChart extends Component{
    constructor(){
        super();
        this.chartColor = [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(57,100,230,0.6)',
            'rgba(57,100,100,0.6)',
            'rgba(100,47,56,0.6)',
        ];
    }

    createBarChartData(data){
        console.log("data :",data);
        var data = {
            labels: data.labels,
            datasets:[
                {
                    label:data.labelName,
                    data:data.datasets,
                    backgroundColor:this.chartColor
                }
            ]
        }
        return data;
    }



    render(){
        console.log("this.props.data",this.props.data);
        return (
            <div className="chart">
                <Bar
                    data={this.createBarChartData(this.props.data)}
                    options={{
                        title:{
                            display:true,
                            text:this.props.data.header_text,
                            fontSize:25
                        },
                        legend:{
                            display:true,
                            position:"right"
                        }
                    }}
                />
            </div>
        )
    }
}

export default BarChart;
