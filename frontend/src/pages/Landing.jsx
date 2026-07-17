import { useEffect, useState } from 'react';
import './Landing.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';


// Miniature, non-interactive preview of a real board — shows the actual
// Planned / In Progress / Review / Complete structure instead of a placeholder graphic.
const BoardPreview = function () {
	return (
		<div className="board-preview" aria-hidden="true">
			<div className="board-preview-col">
				<div className="board-preview-label planned">Planned</div>
				<div className="board-preview-card" />
				<div className="board-preview-card" />
			</div>
			<div className="board-preview-col">
				<div className="board-preview-label in-progress">In Progress</div>
				<div className="board-preview-card active" />
			</div>
			<div className="board-preview-col">
				<div className="board-preview-label review">Review</div>
				<div className="board-preview-card" />
			</div>
			<div className="board-preview-col">
				<div className="board-preview-label complete">Complete</div>
				<div className="board-preview-card done" />
			</div>
		</div>
	);
}



const Section1 = function({ onAuthSuccess, openLoginOnLoad }) {
	const navigate = useNavigate();
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

	useEffect(() => {
		if (openLoginOnLoad) {
			setIsLoginOpen(true);
		}
	}, [openLoginOnLoad]);

	function switchToRegistration() {
		setIsLoginOpen(false);
		setIsRegistrationOpen(true);
	}

	function switchToLogin() {
		setIsRegistrationOpen(false);
		setIsLoginOpen(true);
	}
	
	return(
		<>
			<div className='section1'>
				<div className="left">
					<h1>A simple board<br></br>For getting things<br></br>done.</h1>
					<h2>No clutter, in one clear view — get stuff done.</h2>

					<div className="ctas">
						<button onClick={() => setIsRegistrationOpen(true)} className="btn-primary">Get Started</button>
					</div>
				</div>
				<div className='right'>
					<BoardPreview />
				</div>
			</div>
			<Login isOpen={isLoginOpen} closeModal={setIsLoginOpen} onSwitchToRegistration={switchToRegistration} onAuthSuccess={onAuthSuccess} />
			<Registration isOpen={isRegistrationOpen} closeModal={setIsRegistrationOpen} onSwitchToLogin={switchToLogin} onAuthSuccess={onAuthSuccess} />
		</>
	);
}


export default function Landing ({ onAuthSuccess }) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const openLoginOnLoad = searchParams.get('login') === '1';

	return (
		<div className="page-container landing">
				<Section1 onAuthSuccess={onAuthSuccess} openLoginOnLoad={openLoginOnLoad} />
				<p className='link' onClick={() => navigate('/styleguide')}>Style Guide</p>
		</div>
	)

}