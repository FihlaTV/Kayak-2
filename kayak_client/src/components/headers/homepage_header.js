import React,{ Component } from 'react';
import './../../images/home.css';
import homeIcon from './../../images/homescreen.png';
import kayaklogo from './../../images/kayak-logo.png';
import googleicon from './../../images/googleicon.png';
import userIcon from './../../images/user3.png';
import {history} from "./../../utils/util";
import { useraction } from './../../actions/user_action';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import signinn from './../sign_in.js';
class HomePageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            user: {
                username: '',
                password: ''
            },
            showModal:false
        };
        this.signin = this.signin.bind(this);
        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        console.log(this.state.user);
    }

    handleOpenMenu = () => {
        this.setState({
            openMenu: true,
        });
    };

    handleOnRequestChange = (value) => {
        this.setState({
            openMenu: value,
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.state;
        const { dispatch } = this.props;
        console.log("in handlesubmit"+ user.username + " " + user.password);
        if (user.username && user.password) {
            this.props.signin_action(user);
        }
    }

    handleSubmit1(event) {
        event.preventDefault();
        const { user } = this.state;
        const { dispatch } = this.props;
        console.log("in handlesubmit"+ user.username + " " + user.password);
        if (user.username && user.password) {
            this.props.signup_action(user);
        }
    }

    signup()
    {
        history.push('./signup');
    }

    signin()
    {
        history.push('./signin');
    }
    redirect()
    {
        history.push('/flights');
    }
  render() {
    console.log("HomePage Header");
    var style_logo={
        marginTop:"12px"
    };
    return (
        <nav className="navbar navbar-inverse navbar-top">
            <div className="container">
                <div className="navbar-header">
                    <img className="img-responsive" style={style_logo} src={kayaklogo}/>
                </div>
                <ul className="nav navbar-nav">
                    <li><a href="/flights">Flights</a></li>
                    <li><a href="/hotels">Hotels</a></li>
                    <li><a href="/cars">Cars</a></li>
                    <li><a href="/adminlogin">Admin</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li>   <button type="button" className="btn btn-danger navbar-btn" data-toggle="modal" data-target="#myModal1">
                        <span className="glyphicon glyphicon-user"/> Login </button>
                        <div className="modal fade" id="myModal1" role="dialog">
                            <div className="modal-dialog" style={{width:"30%"}}>
                                <div className="modal-content">
                                    <div className="modal-body" style={{textAlign:"center"}}>
                                        <div className="fb-login-button" data-max-rows="1" style={{marginTop:"3%"}} data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false">
                                        </div>
                                        <div style={{marginTop:"4%"}}><a href="#"><img src={googleicon} style={{height:"50px", width:"260px"}}/></a>
                                        </div>
                                        <form style={{textAlign:"center", marginTop:"4%"}}>
                                            <div className="form-group" style={{textAlign:"center", marginLeft: '21%'}}>
                                                <div className="form-group" style={{display: "flex", width:"250px"}}>
                                                    <input className="form-control" type="text" name="username" placeholder="Email Address" value={this.state.username} onChange={this.handleChange}/>
                                                </div>
                                                <div className="form-group" style={{display: "flex", width:"250px"}}>
                                                    <input className="form-control" type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                                                </div>
                                                <button type="button" className="btn btn-info" style={{display: "flex",marginLeft: '25%'}} onClick={this.handleSubmit} data-dismiss="modal">
                                                    Login </button>
                                            </div>
                                        </form>
                                    </div>
                                    {/*<div className="modal-footer">*/}
                                        {/*<button type="button" className="btn btn-default" data-dismiss="modal">close</button>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>
                    <li><button type="button" className="btn btn-danger navbar-btn" data-toggle="modal" data-target="#myModal2">
                        <span className="glyphicon glyphicon-user"/> Sign Up</button>
                        <div className="modal fade" id="myModal2" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <h4 className="modal-title">Sign Up</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="fb-login-button" data-max-rows="1" style={{marginTop:"3%"}} data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false">
                                        </div>
                                        <div style={{marginTop:"4%"}}><a href="#"><img src={googleicon} style={{height:"50px", width:"260px"}}/></a>
                                        </div>
                                        <form style={{textAlign:"center", marginTop:"4%"}}>
                                            <div className="form-group" style={{textAlign:"center", marginLeft: '21%'}}>
                                                <div className="form-group" style={{display: "flex", width:"250px"}}>
                                                    <input className="form-control" type="text" placeholder="Email Address" name="username" value={this.state.username} onChange={this.handleChange}/>
                                                </div>
                                                <div className="form-group" style={{display: "flex", width:"250px"}}>
                                                    <input className="form-control" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                                                </div>
                                                <button type="button" className="btn btn-info" style={{display: "flex",marginLeft: '25%'}} onClick={this.handleSubmit1} data-dismiss="modal">
                                                    Sign Up </button>
                                            </div>
                                        </form>

                                    </div>
                                    {/*<div className="modal-footer">*/}
                                        {/*<button type="button" className="btn btn-default" data-dismiss="modal">Save</button>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({signin_action:useraction.signin_action, signup_action: useraction.signup_action},dispatch);
}
export default connect(null,mapDispatchToProps)(HomePageHeader);
