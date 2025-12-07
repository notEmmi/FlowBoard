import { Link } from 'react-router-dom';
import './Landing.css';
import HeroImage from '../assets/hero.png'
import { useNavigate } from 'react-router-dom';



const Section1 = function() {
	const navigate = useNavigate();
	return(
		<div className='section1'>
			<div className="left">
				
				<h1>Plan smarter.<br></br>Build faster.</h1>
				<h2>A project board built for builders.</h2>

				<div className="ctas">
					<button onClick={() => navigate('/register')} className="btn-primary">Get started</button>
					<button onClick={() => navigate('/login')} className="btn-ghost">Sign in</button>
				</div>
			</div>
			<div className='right'>
				<img src={ HeroImage } alt="Hero" className='hero-image' />
			</div>
		</div>
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