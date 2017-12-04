import React,{ Component } from 'react';
import './../../images/subcomponent.css';
import { connect } from 'react-redux';


class CarBillingSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            car_price: '200',
            days: '2',
            finalamount:''
        };
        // this.submitPrice = this.submitPrice.bind(this);
    }
    componentWillMount()
    {
        this.setState({
            car_price: this.props.data.car_price,
            days: this.props.car_days.days
        });
    }
  render() {
      const {car_price}=this.state;
      const {days}=this.state;
      const totalprice_days = car_price * days;
      const totaltax_days= this.props.car_days.days*10;
      const finalamount= totalprice_days+totaltax_days;
    return (
      <div className="car-billing-summary">
            <div className="car-summary" >
                <div className="car-summary-1">
                    <strong ><h4>Summary</h4></strong>
                    <h6>{this.props.current_car.car_type}, {this.props.current_car.car_capacity} people/{this.props.current_car.car_no_of_bags}bag,With Air-conditioning {this.props.car_days.carfromdate} - {this.props.car_days.cartodate} ({this.props.car_days.days} day/s)</h6>
                    <hr/>
                </div >
                <div className="car-summary-2">
                    <div>
                    <strong><h4> Charges </h4></strong>
                    <h5>{this.props.current_car.car_type} (Per Day)</h5>
                        ${this.props.current_car.car_price}
                    <hr/>
                    </div>

                    <div>
                    <h5>Tax and Fees : ${totaltax_days}</h5>

                    <hr/>
                    </div>

                    <div>
                        <h5>Total cost :<b style={{fontSize:20}}>${finalamount}</b></h5>
                    </div>

                </div>
          </div>
      </div>
          );
  }
}
function mapStateToProps(state) {
    return {
        car_finalamount: state.cardetails_reducer.car_finalamount,
        current_car:state.cardetails_reducer.current_car,
        car_days:state.cardetails_reducer.car_days
    };

}

export default connect(mapStateToProps,null)(CarBillingSummary);
