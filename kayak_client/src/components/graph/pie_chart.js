// import React, {Component} from 'react';
// import {Pie} from 'react-chartjs-2';
// import Graph from 'react-graph-vis';
//
// class PieChart extends Component{
//     constructor(){
//         super();
//     }
//
//     render(){
//         var graph = {
//             nodes: [
//                 {id: 1, label: 'San jose', group:'city1'},
//                 {id: 2, label: 'Fights', group:'city1'},
//                 {id: 3, label: 'Hotels', group:'city1'},
//                 {id: 4, label: 'Cars', group:'city1'},
//                 {id: 6, label: 'Santa Clara', group:'city2'},
//                 {id: 7, label: 'Fights', group:'city2'},
//                 {id: 8, label: 'Hotels', group:'city2'},
//                 {id: 9, label: 'Cars', group:'city2'}
//             ],
//             edges: [
//                 {from: 1, to: 2},
//                 {from: 1, to: 3},
//                 {from: 1, to: 4},
//                 {from: 6, to: 7},
//                 {from: 6, to: 8},
//                 {from: 6, to: 9}
//             ]
//         };
//
//         var options = {
//             autoResize: true,
//             height: '100%',
//             width: '100%',
//             locale: 'en',
//             clickToUse: false,
//             nodes:{
//                 color: '#77a3ea',
//                 fixed: false,
//                 shape: 'circle',
//                 shadow: true
//             },
//             groups: {
//                 useDefaultGroups: true,
//                 city1: {color:{background:'red'}, borderWidth:2},
//                 city2: {color:{background:'yellow'}, borderWidth:2}
//             }
//         };
//
//         var events = {
//             select: function(event) {
//                 var { nodes, edges } = event;
//             }
//         };
//         return (
//             <div className="chart" style={{height:"100%"}}>
//               <Graph graph={graph} options={options} events={events} />
//             </div>
//         )
//     }
// }
//
// export default PieChart;

import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';

/*
expected data while creting this component
var data={
    labels: [],
    datasets:[],
    labelName:"Revenue",
    header_text:"Top 10 hotel revenue"
}*/

class PieChart extends Component{
    constructor(){
        super();
        this.state={
            data1:{
                labels: [
                    'United Airlines',
                    'Delts',
                    'Hilton Hotels'
                ],
                datasets: [{
                    data: [400, 500, 100],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            },
            data2:{
                labels: [
                    'United Airlines',
                    'Delts',
                    'Hilton Hotels'
                ],
                datasets: [{
                    data: [100, 200, 500],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            },
            data3:{
                labels: [
                    'United Airlines',
                    'Delts',
                    'Hilton Hotels'
                ],
                datasets: [{
                    data: [4, 3, 4],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            }


        };

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

    createPieChartData(data){
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
        return (
            <div className="chart" style={{display:"block-inline", padding:"2%"}}>
                               <div style={{float:"left"}}>
                                 <Doughnut data={this.createPieChartData(this.props.data)}
                                         width="350px"
                                           height="350px"
                                           options={{
                                               maintainAspectRatio: false
                                           }}/>
                               </div>
                             </div>



            // <div className="chart">
            //     <Pie
            //         data={this.createPieChartData(this.props.data)}
            //         options={{
            //             title:{
            //                 display:true,
            //                 text:this.props.data.header_text,
            //                 fontSize:25
            //             },
            //             legend:{
            //                 display:true,
            //                 position:"right"
            //             }
            //         }}
            //     />
            // </div>
        )
    }
}

export default PieChart;
