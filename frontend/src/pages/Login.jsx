import './Login.css';
import Modal from '../components/Modal.jsx';
import Divider from '../components/Divider.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login ( {isOpen, closeModal, onSwitchToRegistration}) {
	const navigate = useNavigate();
	const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

	function openRegistration(){
		if (onSwitchToRegistration) {
			closeModal(false);
			onSwitchToRegistration();
		}
	}

	function openForgotPassword(){
		closeModal(false);
		setIsForgotPasswordOpen(true);
	}

	function switchToLogin(){
			setIsForgotPasswordOpen(false);
			closeModal(true);
	}

	function authenticate() {
		navigate('/Dashboard');
		closeModal(false);
	}

	return (
		<>
		<Modal isOpen={isOpen} onClose={() => closeModal(false)}>
			<div className="page-container login">
					<h2>Welcome Back</h2>
					<p className='tagline'>Access your saved projects.</p>
					<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
						<label>
							Email
							<input type="email" name="email" placeholder="you@example.com" />
						</label>

						<label>
							Password
							<input type="password" name="password" placeholder="Enter Password" />
						</label>

						<button type="submit" className="btn-primary" onClick={() => authenticate()}>Login</button>
					</form>

					<Divider label={"OR"}/>
					<div className='other-links'>
						<p>Don't Have an Account? <span className='link' onClick={() => openRegistration() }>Register</span>.</p>
						<p>Forgot Password? <span className='link' onClick={() => openForgotPassword()}>Click here</span>.</p>
					</div>
			</div>
		</Modal>
		<ForgotPassword isOpen={isForgotPasswordOpen} closeModal={setIsForgotPasswordOpen} onSwitchToLogin={switchToLogin} />
		</>
	);
}