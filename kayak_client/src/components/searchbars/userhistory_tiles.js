import React,{ Component } from 'react';
import HomePageHeader from './../headers/homepage_header';
import './../../images/user_profile.css';


class UserHistoryTile extends Component {


  render() {
    console.log("It will display user profile");
    return (
            <div>
             

             
                 
                
                    <table style = {{padding : 30}}>
                        <tbody>
                          <tr>
                            <td><strong>Booking ID</strong></td>
                            <td>{this.props.data.booking_id}</td>
                          </tr>
                          <hr></hr>
                          <tr>
                            <td><strong>Property Name</strong></td>
                            <td>{this.props.data.property_name}</td>
                          </tr>
                          <hr></hr>
                          <tr>
                            <td><strong>Booking Date</strong></td>
                            <td><a href="">{this.props.data.booking_date}</a></td>
                          </tr>
                          <hr></hr>
                          <tr>
                            <td><strong>Booking Amount :</strong></td>
                            <td> ${this.props.data.booking_amount}</td>
                          </tr>
                          <br></br>
                          <br></br>
                          <hr></hr>
                          

                        </tbody>
                      </table>

                 
            


            </div>
           );
  }
}



export default UserHistoryTile;
