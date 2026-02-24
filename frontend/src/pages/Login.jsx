import './Login.css';
import Modal from '../components/Modal.jsx';
import Divider from '../components/Divider.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../api';

export default function Login ( {isOpen, closeModal, onSwitchToRegistration, onAuthSuccess}) {
	const navigate = useNavigate();
	const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

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

	async function authenticate(e) {
		e.preventDefault();
		setError('');
		setIsSubmitting(true);

		try {
			await login({ email, password });
			onAuthSuccess?.();
			navigate('/dashboard');
			closeModal(false);
			setEmail('');
			setPassword('');
		} catch (err) {
			setError(err.message || 'Login failed');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<>
		<Modal isOpen={isOpen} onClose={() => closeModal(false)}>
			<div className="login">
					<h2>Welcome Back</h2>
					<p className='tagline'>Access your saved projects.</p>
					<form className="auth-form" onSubmit={authenticate}>
						<label>
							Email
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>

						<label>
							Password
							<input
								type="password"
								name="password"
								placeholder="Enter Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>

						{error && <p className='tagline'>{error}</p>}

						<button type="submit" className="btn-primary" disabled={isSubmitting}>
							{isSubmitting ? 'Logging in...' : 'Login'}
						</button>
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