import React,{ Component } from 'react';
import { connect } from 'react-redux';
import HotelSearchBar from './searchbars/hotel_search_bar.js';
import HomeHeader from './headers/homepage_header';
import HomeHeader1 from './headers/homepage_header1';
import {bindActionCreators} from 'redux';
import Carousel from './subcomponents/carousel_slider.js'
import '../images/home.css';
import HomeScreenButtonPanel from './searchbars/homescreen_button_panel';
import {useraction} from "../actions/user_action";

class SearchHotel extends Component {
    constructor(props) {
        super(props);
        this.init();
        //this.checkSession = this.checkSession.bind(this);
    }
    init() {
        console.log("component check");
        // API.checkSession().then((res) => {
        //     if (res.status === 500){
        //         this.props.history.push("/");
        //     }
        //     else if(res.status === 200) {
        //         this.setState({
        //             owner:res.owner
        //         });
        //         var owner1 = res.owner;
        //         if (!this.state.files || this.state.files.length === 0) {
        //             API.getImages({value: owner1, parent:'root'})
        //                 .then((data) => {
        //                     console.log(data);
        //                     this.setState({
        //                         files: data
        //                     });
        //                 });
        //
        //         }
        //     }});


        this.props.checkSession();
    }

  render() {
    console.log("Search Hotel Page");
      const divToShow  =
          ((this.props.user_id.result)?<HomeHeader1/>:<HomeHeader/>);
    return (
        <div className="hotel-home">
            {divToShow}
              <div style={{paddingTop:"8%"}}>
                  <HomeScreenButtonPanel/>
                  <HotelSearchBar/>
                  <Carousel/>
              </div>
        </div>
           );
  }
}

function mapStateToProps(state) {

    return {
        user_id:state.users.user_id
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({checkSession:useraction.checkSession},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchHotel);


