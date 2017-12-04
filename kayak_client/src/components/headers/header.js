import React,{ Component } from 'react';
import '../../App.css';
import HeaderImage from './../../images/kayak.png';
class Headers extends Component {

    render() {


        console.log("It will display list of cars searched by the user");
        return (
			<div className="row">
				<nav className="nav">
					<div className="logo">
						<img src={HeaderImage}/>
					</div>
					<ul className="navbar">

						<a className="nav-link" href="#">Hotels</a>


						<a className="nav-link" href="#">Flights</a>


						<a className="nav-link" href="#">Cars</a>


						<a className="nav-link disabled" href="#">Disabled</a>

					</ul>
				</nav>
			</div>
        );
    }
}



export default Headers;
