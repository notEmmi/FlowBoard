import Title from "../components/Title";
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing () {
	return (
		<div className="page-container landing-page">
			<Title />

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