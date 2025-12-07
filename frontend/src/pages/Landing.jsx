import { Link } from 'react-router-dom';
import './Landing.css';
import FlowBoardIcon from '../assets/flowboard-icon.png'
import HeroImage from '../assets/hero.png'
import { useNavigate } from 'react-router-dom';


const LandingNavBar = function()  {
	const navigate = useNavigate();
	return(
		<div className="landing-nav-container">
			<div className="landing-logo">
				<img src={ FlowBoardIcon } alt="FlowBoard Icon" className="flowboard-icon"/>
				<h3>FlowBoard</h3>
			</div>
			<div className="landing-nav">
				<button onClick={() => navigate('/login')} className='btn-ghost'>Sign In</button>
				<button onClick={() => navigate('/register')} className='btn-primary'>Get Started</button>
			</div>
		</div>
	);
}

const Section1 = function() {
	return(
		<div className='landing-section1'>
			<div className="section1-left">
				
				<h1>Plan smarter.<br></br>Build faster.</h1>
				<h2>A project board built for builders.</h2>

				<div className="landing-ctas">
					<button onClick={() => navigate('/register')} className="btn-primary">Get started</button>
					<button onClick={() => navigate('/login')} className="btn-ghost">Sign in</button>
				</div>
			</div>
			<div className='section1-right'>
				<img src={ HeroImage } alt="Hero" className='hero-image' />
			</div>
		</div>
	);
}


export default function Landing () {
	return (
		<div className="page-container landing-page">
			<LandingNavBar />

			<div className="landing-page-content">
				<Section1 />
			</div>
		</div>
	)

}