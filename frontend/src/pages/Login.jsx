import './Auth.css';
import Modal from '../components/Modal.jsx';
import Divider from '../components/Divider.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../api';
import Alert from '../components/Alerts.jsx';

export default function Login ( {isOpen, closeModal, onSwitchToRegistration, onAuthSuccess}) {
	const navigate = useNavigate();
	const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	function validEmail(value) {
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return pattern.test(value);
	}

	function validateForm() {
		let isValid = true;
		const trimmedEmail = email.trim();
		setEmailError('');
		setPasswordError('');

		if (!trimmedEmail) {
			setEmailError('Email is required.');
			isValid = false;
		} else if (!validEmail(trimmedEmail)) {
			setEmailError('Invalid email format. (e.g., name@example.com)');
			isValid = false;
		}

		if (!password) {
			setPasswordError('Password is required.');
			isValid = false;
		}
		return isValid;
	}

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
		setEmailError('');
		setPasswordError('');

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			await login({ email: email.trim(), password });
			onAuthSuccess?.();
			navigate('/dashboard');
			closeModal(false);
			setEmail('');
			setPassword('');
		} catch (err) {
			setError(err?.userMessage || err?.message || 'Login failed');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<>
		<Modal isOpen={isOpen} onClose={() => closeModal(false)}>
			<div className="login">
					{error && <Alert type='error'>{error}</Alert>}

					<h2>Welcome Back</h2>
					<p className='tagline'>Access your saved projects.</p>
				
					<form className="auth-form" onSubmit={authenticate} noValidate>
						<label>
							<span>Email</span>
							<div className='field-control'>
								<input
									className={emailError ? 'input-error' : ''}
									aria-invalid={!!emailError}
									aria-describedby={emailError ? 'login-email-error' : undefined}
									type="email"
									name="email"
									placeholder="you@example.com"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										if (emailError) {
											setEmailError('');
										}
									}}
									required
								/>
								{emailError && <p id="login-email-error" className="field-error" role="alert">{emailError}</p>}
							</div>
						</label>

						<label>
							<span>Password</span>
							<div className='field-control'>
								<input
									className={passwordError ? 'input-error' : ''}
									aria-invalid={!!passwordError}
									aria-describedby={passwordError ? 'login-password-error' : undefined}
									type="password"
									name="password"
									placeholder="Enter Password"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										if (passwordError) {
											setPasswordError('');
										}
									}}
									required
								/>
								{passwordError && <p id="login-password-error" className="field-error" role="alert">{passwordError}</p>}
							</div>
						</label>


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