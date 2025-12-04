import { Link } from 'react-router-dom';
import './Landing.css';
import FlowBoardIcon from '../assets/flowboard-icon.png'


const LandingNavBar = function()  {
	return(
		<div className="landing-nav-container">
			<div className="landing-logo">
				<img src={ FlowBoardIcon } alt="FlowBoard Icon" className="flowboard-icon"/>
				<h3>FlowBoard</h3>
			</div>
			<div className="landing-nav">
				<p>Login</p>
				<p>Register</p>
				<p>Support</p>
			</div>
		</div>
	);
}

export default function Landing () {
	return (
		<div className="page-container landing-page">
			<LandingNavBar />

			<div className="landing-page-content">
				<h1>Plan smarter. Build faster.</h1>
				<h2>A project board built for builders.</h2>

				<div className="landing-ctas">
					<Link to="/register" className="btn-primary">Get started</Link>
					<Link to="/login" className="btn-ghost">Sign in</Link>
				</div>
			</div>
		</div>
	)

}