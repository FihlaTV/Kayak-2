import React,{ Component } from 'react';
import './../../images/home.css';

class RenderDetails extends Component {


  render() {
    return (
              <div className = "render-details">
                      <div className= "render-details-top-div">
                          <h4><b>Vistor Details</b></h4>
                          <hr/>
                      </div>
                      <br></br><br></br><br/>
                      <div className= "render-details-bottom-div">
                              <input type="text" className="form-control" placeholder="First Name*" style={{width : "350px" , height : "30px"}}/><br></br>
                          <input type="text" className="form-control"  placeholder="Last Name*" style={{width : "350px" , height : "30px"}}/><br></br>
                          <input type="text" className="form-control" placeholder="Email*" style={{width : "350px" , height : "30px"}}/><br></br>
                              <select style={{width : "350px" , height : "30px"}}>
                                  <option>Gender*</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                              </select><br></br><br></br>
                              <input type="text" className="form-control" placeholder="Contact Number*" style={{width : "350px" , height : "30px"}}/>
                      </div>
              </div>

           );
  }
}

export default RenderDetails;
