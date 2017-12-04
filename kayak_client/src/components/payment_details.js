import React,{ Component } from 'react';
import HomePageHeader from './headers/homepage_header';
import './../images/user_profile.css';
import PaymentDetailsTile from './searchbars/paymentdetails_tiles';


class PaymentDetails extends Component {

    constructor(){
  super();
 this.paymentdetails = [{
                name_on_card:"Lufthanza Kumari",
                last_digits:1234,
                card_type: "VISA",
                address : "1318 The Julian",
                city : "San Jose",
                state : "California",
                zip: 95126
              },{
                name_on_card:"SouthWest Kumar",
                last_digits:5234,
                card_type: "VISA",
                address : "1318 The Alameda",
                city : "San Jose",
                state : "California",
                zip: 95126
              }]
}

handleEdit(){
    console.log("Clicked Edit Card");
  }
  handleAdd(){
    console.log("Clicked Add Card");
  }

  getPaymentDetailsTIle(paymentdetails){
    console.log("PaymentDetails: ", paymentdetails);
    return paymentdetails.map((paymentdetails)=>{
      return (<PaymentDetailsTile data={paymentdetails} style={{paddingTop:10}}/>)
    });
  }
  render() {
    console.log("It will display user payment details");
    return (
            <div>
              <div className="user-profile-header">
                <HomePageHeader/>
              </div>

              <div className= "user-profile-body">
                  <div className= "user-profile-body-nav-options">
                    <br></br>
                    <a href="">Preference</a>
                    <br></br>
                    <br></br>
                    <a href="">User History</a>
                  </div>
                    <p style={{fontSize : "20pt"}}>Payment Details</p>
                    <br></br>
                    <br></br>
                   
                       {this.getPaymentDetailsTIle(this.paymentdetails)}

                        <button onClick ={() => this.handleAdd()} type="submit" className="btn btn-primary" style={{width:150}}>Add</button>
                         <button onClick ={() => this.handleEdit()} type="submit" className="btn btn-primary" style={{width:150}}>Edit</button>

              </div>





            </div>
           );
  }
}



export default PaymentDetails;
