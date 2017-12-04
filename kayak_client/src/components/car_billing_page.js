import React,{ Component } from 'react';
import HomePageHeader from './headers/homepage_header';
import HomePageHeader1 from './headers/homepage_header1';
import CarBillingSummary from './subcomponents/car_billing_summary';
import ViewCar from './subcomponents/view_car';
import BookingDetails from './subcomponents/booking_details';
import RentalCarPrice from './subcomponents/rental_car_price';
import RenderDetails from './subcomponents/render1_details';
import RentalCarDamageProtection from './subcomponents/rental_car_damage_protection';
import BookFasterNextTime from './subcomponents/book_faster_next_time';
import TermsAndConditions from './subcomponents/terms_and_conditions';
import BillingInformation from './subcomponents/billing_information'
import './../images/subcomponent.css';
import './../images/home.css';
import { connect } from 'react-redux';
class CarBillingPage extends Component {


  render() {
      const divToShow  =
          ((this.props.user_id.result)?<HomePageHeader1/>:<HomePageHeader/>);
    return (
        <div className="background1">
              <div className="car-billing-page">
                  <div className="car-billing-page-header">
                      {divToShow}
                  </div>
                  <div className = "car-billing-body">
                      <div className ="car-billing-body-left-nav" >
                      </div>

                      <div className ="car-billing-body-centre">
                        <ViewCar data={this.props.current_car}/>
                        <BookingDetails data={this.props.current_car}/>
                        <RentalCarPrice data={this.props.current_car}/>
                        <RenderDetails data={this.props.current_car}/>
                        <BillingInformation/>
                        <TermsAndConditions data={this.props.current_car}/>
                      </div>

                      <div className ="car-billing-body-right-nav">
                      <CarBillingSummary data={this.props.current_car}/>
                      </div>
                  </div>

              </div>
        </div>

           );
  }
}
function mapStateToProps(state) {
    console.log("hiii"+state.cardetails_reducer.current_car.days);
    return {
        current_car: state.cardetails_reducer.current_car,
        user_id:state.users.user_id
    };

}


export default connect(mapStateToProps,null)(CarBillingPage);
