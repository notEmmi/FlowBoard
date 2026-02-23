import { useNavigate } from 'react-router-dom';
import './TopNav.css'
import FlowBoardIcon from '../assets/flowboard-icon.png'
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import { useState } from 'react';



export default function TopNav({ isLoggedIn, onAuthSuccess, onLogout }) {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
	const navigate = useNavigate();

	function logout() {
		onLogout?.();
		navigate('/landing');
	}

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
			<div className="top-nav-container">
				<div className="top-logo">
					<button onClick={() => navigate('/')} className='btn-logo'>
						<img src={ FlowBoardIcon } alt="FlowBoard Icon" className="flowboard-icon icon"/>
						<h3>FlowBoard</h3>
					</button>
				</div>
				<div className="top-nav">
					{isLoggedIn ? (
						<>
							<button onClick={() => navigate('/dashboard')} className='btn-ghost'>Dashboard</button>
							<button onClick={logout} className='btn-ghost'>Log Out</button>
						</>
					) : (
						<>
							<button onClick={() => setIsLoginOpen(true)} className='btn-ghost'>Sign In</button>
							<button onClick={() => setIsRegistrationOpen(true)} className='btn-ghost'>Create Account</button>
						</>
					)}
				</div>
			</div>
			<Login isOpen={isLoginOpen} closeModal={setIsLoginOpen} onSwitchToRegistration={switchToRegistration} onAuthSuccess={onAuthSuccess} />
			<Registration isOpen={isRegistrationOpen} closeModal={setIsRegistrationOpen} onSwitchToLogin={switchToLogin} onAuthSuccess={onAuthSuccess} />
		</>
	);
}