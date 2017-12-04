import React,{ Component } from 'react';
import la from './../../images/la.jpg';
import ny from './../../images/ny.jpg';
import al from './../../images/al.jpg';

class Carousel extends Component {

    render() {
        console.log("Carousel/Slider");
        return (
            <div>
                <div className="container" style={{marginTop:"10%"}}>
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"/>
                            <li data-target="#myCarousel" data-slide-to="1"/>
                            <li data-target="#myCarousel" data-slide-to="2"/>
                        </ol>
                        <div className="carousel-inner" style={{width:"100%", height: "100%"}}>
                            <div className="item active">
                                <img src={la} alt="Los Angeles" style={{height:"100%", width: "100%"}}/>
                                    <div className="carousel-caption">
                                        <h1>Los Angeles, CA</h1>
                                        <h3>Origin to Destination</h3>
                                        <h3>Arrival to Departure time</h3>
                                    </div>
                            </div>

                            <div className="item">
                                <img src={ny} alt="Chicago" style={{width:"100%"}}/>
                                    <div className="carousel-caption">
                                        <h1>New York, NY</h1>
                                        <h3>Origin to Destination</h3>
                                        <h3>Arrival to Departure time</h3>
                                    </div>
                            </div>

                            <div className="item">
                                <img src={al} alt="New York" style={{width:"100%"}}/>
                                    <div className="carousel-caption">
                                        <h1>Atlanta, GA</h1>
                                        <h3>Origin to Destination</h3>
                                        <h3>Arrival to Departure time</h3>
                                    </div>
                            </div>

                            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                <span className="glyphicon glyphicon-chevron-left"/>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                <span className="glyphicon glyphicon-chevron-right"/>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}

export default Carousel;

