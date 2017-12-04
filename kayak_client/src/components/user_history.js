import React,{ Component } from 'react';
import HomePageHeader from './headers/homepage_header';
import './../images/user_profile.css';
import UserHistoryTile from './searchbars/userhistory_tiles';


class UserHistory extends Component {

  constructor(){
  super();
 this.userhistory = [{
                user_id:12345,
                booking_id:1234,
                property_name: "Sofitel Los Angeles",
                booking_date : "13/12/2017",
                booking_amount: 200
              },{
                user_id:12345,
                booking_id:1768,
                property_name: "LeMeridien San Jose",
                booking_date : "13/16/2017",
                booking_amount: 250
              },{
                user_id:12345,
                booking_id:5234,
                property_name: "Stevens Creek Chicago",
                booking_date : "13/14/2017",
                booking_amount: 100
              }]
}


   getUserHistoryTile(userhistory){
    console.log("UserHistory: ", userhistory);
    return userhistory.map((userhistory)=>{
      return (<UserHistoryTile data={userhistory} style={{paddingTop:10}}/>)
    });
  }

  render() {
    console.log("It will display user profile");
    return (
            <div>
              <div className="user-profile-header">
                <HomePageHeader/>
              </div>

              <div className= "user-profile-body">
                    <p style={{fontSize : "40pt"}}>Your Bookings with us</p>
                    <br></br>
                    <br></br>
                   
                       {this.getUserHistoryTile(this.userhistory)}

              </div>



            </div>
           );
  }
}



export default UserHistory;
