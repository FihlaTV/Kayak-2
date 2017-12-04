import React,{ Component } from 'react';
import HotelTile from './searchbars/hotel_tiles';
import HomePageHeader from './headers/homepage_header';
import HomePageHeader1 from './headers/homepage_header1';
import { connect } from 'react-redux';
import './../images/home.css';
import HotelSearchLeftNav from './searchbars/hotel_search_leftnav';

class ShowHotels extends Component {
constructor(){
  super();
 
}
  
  render() {
    console.log("It will display list of hotels searched by the user");
      const divToShow  =
          ((this.props.user_id.result)?<HomePageHeader1/>:<HomePageHeader/>);
    return (
        <div className="background2">
              <div>
                <div>
                    {divToShow}
                </div>

              <div className = "hotel-details-body">
                <div className ="hotel-details-body-left-nav">
                    <HotelSearchLeftNav/>
                </div>
                 <div className ="car-details-body-centre">
                      {this.props.listofdisplayedhotels.length > 0 ?
                          this.props.listofdisplayedhotels.map((hotel) => {
                              return (<div><HotelTile data={hotel} style={{paddingTop: 10}}/></div>);
                          })
                          : ''
                      }
                  </div>
                <div className ="hotel-details-body-right-nav">

                </div>
              </div>

              </div>
        </div>
           );
  }

}
function mapStateToProps(state) {
     console.log("hiii"+state.hoteldetails_reducer.hotels);
    return {
        listofdisplayedhotels: state.hoteldetails_reducer.displayedhotels,
        user_id:state.users.user_id
        
     };

}

export default connect(mapStateToProps,null)(ShowHotels);
