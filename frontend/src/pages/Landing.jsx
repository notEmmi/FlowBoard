import { useState } from 'react';
import './Landing.css';
import HeroImage from '../assets/hero.png'
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';



const Section1 = function() {
	const navigate = useNavigate();
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
	
	return(
		<>
		<div className='section1'>
			<div className="left">
				
				<h1>Plan smarter.<br></br>Build faster.</h1>
				<h2>A project board built for builders.</h2>

				<div className="ctas">
					<button onClick={() => setIsRegistrationOpen(true)} className="btn-primary">Get started</button>
				</div>
			</div>
			<div className='right'>
				<img src={ HeroImage } alt="Hero" className='hero-image' />
			</div>
		</div>
		<Login isOpen={isLoginOpen} closeModal={setIsLoginOpen} />
		<Registration isOpen={isRegistrationOpen} closeModal={setIsRegistrationOpen} />
		</>
	);
}


export default function Landing () {
	return (
		<div className="page-container landing">
			<div className="content">
				<Section1 />
			</div>
		</div>
	)

}