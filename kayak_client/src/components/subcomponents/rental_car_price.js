import React,{ Component } from 'react';
import './../../images/home.css';
import { connect } from 'react-redux';
import { setPrice } from './../../actions/car_action';
import {bindActionCreators} from 'redux';
class RentalCarPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
                car_price: '200',
                days: '2',
                finalamount:''
        };
        this.submitPrice = this.submitPrice.bind(this);
    }
    componentWillMount()
    {
        this.setState({
            car_price: this.props.data.car_price,
            days: this.props.car_days.days
        });
    }
    submitPrice(event)
    {
        const { name, value } = event.target;
        const {finalamount} =this.state;
        this.setState({
                [name]: value
        });
        this.props.setPrice_action(finalamount);
    }
  render() {
      const {car_price}=this.state;
      const {days}=this.state;
      const totalprice_days = car_price * days;
      const totaltax_days= this.props.car_days.days*10;
      const finalamount= totalprice_days+totaltax_days;
    return (
              <div className = "rental-car-price">
                    <h4>Rental Car Price</h4>
                    <hr/>
                    <table className="table table-hover" style ={{padding : 10}}>
                        <thead>
                            <tr>
                              <th></th>
                              <th>Per Day</th>
                              <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                              <tr>
                                <td><strong>{this.props.current_car.car_type}</strong></td>
                                <td>${this.props.data.car_price}</td>
                                <td>${totalprice_days}</td>
                              </tr>
                              <tr>
                                <td>Taxes and fees</td>
                                <td>$10</td>
                                <td>${totaltax_days}</td>
                              </tr>
                              <tr>
                                <td><strong>Rental Car Total</strong></td>
                                <td>${this.props.data.car_price+10}</td>
                                <td><label name="finalamount" value={this.state.finalamount} onChange={this.submitPrice}/>${finalamount}</td>
                              </tr>
                        </tbody>
                    </table>
              </div>

           );
  }
}
function mapStateToProps(state) {
    return {
        car_days: state.cardetails_reducer.car_days,
        current_car:state.cardetails_reducer.current_car
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({setPrice_action:setPrice},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(RentalCarPrice);
