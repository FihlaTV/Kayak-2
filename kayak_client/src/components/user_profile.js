import React,{ Component } from 'react';
import HomeHeader1 from './headers/homepage_header1';
import HomeHeader from './headers/homepage_header';
import './../images/user_profile.css';
import { connect } from 'react-redux';
import {history} from "./../utils/util";
import {useraction} from "../actions/user_action";
import {bindActionCreators} from 'redux';



class UserProfile extends Component {
    constructor(props) {
        super(props);
        //this.init();
        //this.checkSession = this.checkSession.bind(this);
    }

    // componentWillMount() {
    //     console.log("component check");
    //     // API.checkSession().then((res) => {
    //     //     if (res.status === 500){
    //     //         this.props.history.push("/");
    //     //     }
    //     //     else if(res.status === 200) {
    //     //         this.setState({
    //     //             owner:res.owner
    //     //         });
    //     //         var owner1 = res.owner;
    //     //         if (!this.state.files || this.state.files.length === 0) {
    //     //             API.getImages({value: owner1, parent:'root'})
    //     //                 .then((data) => {
    //     //                     console.log(data);
    //     //                     this.setState({
    //     //                         files: data
    //     //                     });
    //     //                 });
    //     //
    //     //         }
    //     //     }});
    //
    //
    //     this.props.checkSession().then(data){
    //
    //
    //     };
    // }


    handleEdit(){
    history.push('/edituserprofile');
  }


  render() {
    console.log("It will display user profile"+ this.props.data);
      const divToShow  =
          ((this.props.data)?<HomeHeader1/>:<HomeHeader/>);
    return (
            <div>
              <div className="user-profile-header">
                  {divToShow}
              </div>

              <div className= "user-profile-body">
                  <div className= "user-profile-body-nav-options">
                    <br></br>
                    <br></br>
                    <br></br>
                    <a href="/userhistory">History</a>
                  </div>

                  <div className= "user-profile-body-details">
                    <p style={{fontSize : "20pt"}}>Preferences</p>
                    <table className="table">
                        <tbody>
                          <tr>
                            <td><strong>First Name</strong></td>
                            <td>{this.props.data.first_name}</td>
                          </tr>
                          <tr>
                            <td><strong>Second Name</strong></td>
                            <td>{this.props.data.last_name}</td>
                          </tr>
                          <tr>
                            <td><strong>Gender</strong></td>
                            <td>{this.props.data.gender}</td>
                          </tr>
                          <tr>
                            <td><strong>Email</strong></td>
                            <td><a href="">{this.props.data.user_id}</a></td>
                          </tr>
                          <tr>
                            <td><strong>Address</strong></td>
                            <td>{this.props.data.address}</td>
                          </tr>
                          <tr>
                            <td><strong>City</strong></td>
                            <td>{this.props.data.city}</td>
                          </tr>
                          <tr>
                            <td><strong>State</strong></td>
                            <td>{this.props.data.state}</td>
                          </tr>
                          <tr>
                            <td><strong>Zip</strong></td>
                            <td>{this.props.data.zip}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div style = {{width : "100%", marginLeft: 160}}>
                      <button onClick ={() => this.handleEdit()} style={{align:'center', width:"15%",marginTop:"2%"}}><strong>Edit</strong></button>
                      </div>
                  </div>
              </div>



            </div>
           );
  }
}

function mapStateToProps(state) {
    console.log("hiii"+state.cardetails_reducer.cars);
    return {
        data: state.users.user_id.result,

    };

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({checkSession:useraction.checkSession},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);




