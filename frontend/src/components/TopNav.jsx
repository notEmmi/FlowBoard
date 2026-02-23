import { useNavigate } from 'react-router-dom';
import './TopNav.css'
import FlowBoardIcon from '../assets/flowboard-icon.png'
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import { LogIn } from 'lucide-react';
import { useState } from 'react';



export default function TopNav() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
	const navigate = useNavigate();

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
					<button onClick={() => setIsLoginOpen(true)} className='btn-ghost'>Sign In</button>
					<button onClick={() => setIsRegistrationOpen(true)} className='btn-ghost'>Create Account</button>
				</div>
			</div>
			<Login isOpen={isLoginOpen} closeModal={setIsLoginOpen} onSwitchToRegistration={switchToRegistration}/>
			<Registration isOpen={isRegistrationOpen} closeModal={setIsRegistrationOpen} onSwitchToLogin={switchToLogin}/>
		</>
	);
}