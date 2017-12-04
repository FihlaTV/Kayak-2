import React,{ Component } from 'react';
import './../../images/hotel.css';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { useraction } from './../../actions/user_action';

class GuestDetails extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className = "guest-details">

                <strong>Guest 1 details :</strong> (must be an adult)
                <br></br>
                <br></br>
                <div className="guest-details1">
                    <div className="guest-details-div1">
                        <input type="text" placeholder="First Name*" id="first_name" style={{width:350 , height : 35}}/>
                        <br></br>
                        <br></br>
                        <input type="text" placeholder="Email*" id="email" defaultValue="default data" required="true"
                               onChange={(eventdata)=>{this.props.setUser_action(eventdata.target.value)}}
                               style={{width:350 , height : 35}}/>
                    </div>
                    <div className="guest-details-div2">
                        <input type="text" placeholder="Middle Name*" id= "middle_name" style={{width:350 , height : 35}}/>
                        <br></br>
                        <br></br>

                        <input type="text" placeholder="Phone Number*" id= "phone_number" style={{width:350 , height : 35}}/>

                    </div>
                </div>

                <hr/>

            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({setUser_action:useraction.setUser_action},dispatch);
}
export default connect(null,mapDispatchToProps)(GuestDetails);