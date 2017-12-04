import React,{ Component } from 'react';
import './../../images/home.css';


class TravelDetails extends Component {


    render() {
        return (
            <div className = "travel-details">
                <br></br>
                <h4><b>Enter Traveller Details</b></h4>
                <hr/>
                <br></br>
                <div className="travel1">
                    <div className="travel1-div1">
                        <input type="text" className="form-control" placeholder="First Name*" style={{width : "350px" , height : "30px"}}/><br></br>
                        <input type="text" className="form-control"  placeholder="Last Name*" style={{width : "350px" , height : "30px"}}/><br></br>
                        <input type="text" className="form-control"  placeholder="Email*" style={{width : "350px" , height : "30px"}}/><br></br>
                        <select style={{width : "350px" , height : "30px"}}>
                            <option>Gender*</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select><br></br><br></br>
                        <input type="text" className="form-control"  placeholder="Contact Number*" style={{width : "350px" , height : "30px"}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default TravelDetails;