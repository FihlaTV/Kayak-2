import React,{ Component } from 'react';
import clickIcon from './../../images/clickIcon.png';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'material-ui/DatePicker';
import {searchflights_action} from './../../actions/flight_action';
import Autosuggest from 'react-autosuggest';

class FlightSearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightdetails: {
                flight_src_city: '',
                flight_destination_city: '',
                flight_start_date: '',
                flight_end_date: '',
                flight_passengers:''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { flightdetails } = this.state;
        this.setState({
            flightdetails: {
                ...flightdetails,
                [name]: value
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { flightdetails } = this.state;
        const { dispatch } = this.props;
        console.log("its capacity"+flightdetails.flight_passengers);
        this.props.searchflights_action(flightdetails);
    }

  render() {
      const { flightdetails } = this.state;
    return (
              <div className="container-fluid" style = {{height:250}}>

                  <div className = "container-fluid "
                  style = {{height:200,backgroundColor:"#f1f1f1", marginLeft:"8%", marginRight:"12%"}}>

                  <div className="container-fluid pull-left" style={{fontSize:13,paddingTop:30,paddingLeft:30}}>
                  <a style={{color:"black",fontWeight:"bold"}}>ROUND-TRIP</a>
                  <a style={{paddingLeft:35,color:"black",fontWeight:"bold"}}>ONE-WAY</a>
                  </div>
                      <div className="form-group" style={{marginTop:"6%"}}>
                          <input type="text"  className="TextField col-sm-2 col-md-2 col-lg-2" id="srclocation"
                          placeholder="From where?" name="flight_src_city" value={flightdetails.flight_src_city} style={{marginLeft:2,height:70,fontSize:17}} onChange={this.handleChange}/>
                          <input type="text"  className="TextField col-sm-2 col-md-2 col-lg-2" id="deslocation"
                          placeholder="To where?" name="flight_destination_city" value={flightdetails.flight_destination_city} style={{marginLeft:2,height:70, fontSize:17}} onChange={this.handleChange}/>
                          <input type="date"  className="TextField col-sm-2 col-md-2 col-lg-2" id="depart"
                          placeholder="Depart" name="flight_start_date" value={flightdetails.flight_start_date} style={{marginLeft:2,height:70, fontSize:17}} onChange={this.handleChange}/>
                          <input type="date"  className="TextField col-sm-2 col-md-2 col-lg-2" id="return"
                          placeholder="Return" name="flight_end_date" value={flightdetails.flight_end_date} style={{marginLeft:2,height:70, fontSize:17}} onChange={this.handleChange}/>

                          <select className="TextField col-sm-3 col-md-3 col-lg-3" id="flight_passengers" name="flight_passengers" onChange={this.handleChange}
                           style={{marginLeft:2,height:70, fontSize:17}}>
                              <option selected="selected">Adults</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                          </select>
                      </div>
                      <input type="image" src={clickIcon} style={{height:70}} onClick={this.handleSubmit}/>
                  </div>
              </div>
           );
  }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({searchflights_action:searchflights_action},dispatch);
}
export default connect(null,mapDispatchToProps)(FlightSearchBar);
