import './Auth.css';
import Modal from '../components/Modal.jsx';
import Divider from '../components/Divider.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login, register } from '../api';

const COMMON_PASSWORDS = [
	'password',
	'password123',
	'12345678',
	'123456789',
	'1234567890',
	'qwerty123',
	'letmein',
	'welcome123',
	'admin123',
	'iloveyou',
];

export default function Registration ({isOpen, closeModal, onSwitchToLogin, onAuthSuccess}) {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [fieldErrors, setFieldErrors] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	function validEmail(value) {
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return pattern.test(value);
	}

	function validateForm() {
		const nextErrors = {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
		let isValid = true;
		const trimmedUsername = username.trim();
		const trimmedEmail = email.trim();
		const passwordLower = password.toLowerCase();
		const usernameLower = trimmedUsername.toLowerCase();
		const emailLower = trimmedEmail.toLowerCase();
		const emailLocalPart = emailLower.split('@')[0] || '';

		if (!trimmedUsername) {
			nextErrors.username = 'Username is required.';
			isValid = false;
		} else if (trimmedUsername.length < 3) {
			nextErrors.username = 'Username must be at least 3 characters.';
			isValid = false;
		} else if (trimmedUsername.length > 30) {
			nextErrors.username = 'Username must be 30 characters or fewer.';
			isValid = false;
		}

		if (!trimmedEmail) {
			nextErrors.email = 'Email is required.';
			isValid = false;
		} else if (!validEmail(trimmedEmail)) {
			nextErrors.email = 'Invalid email format. (e.g., name@example.com)';
			isValid = false;
		}

		if (!password) {
			nextErrors.password = 'Password is required.';
			isValid = false;
		} else if (password.length < 12) {
			nextErrors.password = 'Password must be at least 12 characters.';
			isValid = false;
		} else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
			nextErrors.password = 'Password must include uppercase, lowercase, number, and special character.';
			isValid = false;
		} else if (COMMON_PASSWORDS.includes(passwordLower)) {
			nextErrors.password = 'This password is too common. Choose a stronger one.';
			isValid = false;
		} else if ((usernameLower.length >= 3 && passwordLower.includes(usernameLower)) || (emailLower && passwordLower.includes(emailLower)) || (emailLocalPart.length >= 3 && passwordLower.includes(emailLocalPart))) {
			nextErrors.password = 'Password cannot contain your username or email.';
			isValid = false;
		}

		if (!confirmPassword) {
			nextErrors.confirmPassword = 'Please confirm your password.';
			isValid = false;
		} else if (password !== confirmPassword) {
			nextErrors.confirmPassword = 'Passwords do not match.';
			isValid = false;
		}

		setFieldErrors(nextErrors);
		return isValid;
	}

	function openLogin() {
		if (onSwitchToLogin) {
			closeModal(false);
			onSwitchToLogin();
		}
	}

	async function authenticate(e) {
		e.preventDefault();
		setError('');
		setFieldErrors({ username: '', email: '', password: '', confirmPassword: '' });

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			await register({ username: username.trim(), email: email.trim(), password });
			await login({ email: email.trim(), password });
			onAuthSuccess?.();
			navigate('/dashboard');
			closeModal(false);
			setUsername('');
			setEmail('');
			setPassword('');
			setConfirmPassword('');
		} catch (err) {
			setError(err.message || 'Registration failed');
		} finally {
			setIsSubmitting(false);
		}
	}
	
	return (
		<>
		<Modal isOpen={isOpen} onClose={() => closeModal(false)} >
			<div className="registration">
				<h2>Create an Account</h2>
				<p className='tagline'>Keep your projects safe and accessible anytime</p>
				<form className="auth-form" onSubmit={authenticate} noValidate>
					<label>
						<span>Username</span>
						<div className='field-control'>
							<input
								className={fieldErrors.username ? 'input-error' : ''}
								aria-invalid={!!fieldErrors.username}
								aria-describedby={fieldErrors.username ? 'registration-username-error' : undefined}
								type="text"
								name="name"
								placeholder="Enter username"
								value={username}
								minLength={3}
								maxLength={30}
								onChange={(e) => {
									setUsername(e.target.value);
									if (fieldErrors.username) {
										setFieldErrors((prev) => ({ ...prev, username: '' }));
									}
								}}
								required
							/>
							{fieldErrors.username && <p id="registration-username-error" className="field-error" role="alert">{fieldErrors.username}</p>}
						</div>
					</label>

					<label>
						<span>Email</span>
						<div className='field-control'>
							<input
								className={fieldErrors.email ? 'input-error' : ''}
								aria-invalid={!!fieldErrors.email}
								aria-describedby={fieldErrors.email ? 'registration-email-error' : undefined}
								type="email"
								name="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									if (fieldErrors.email) {
										setFieldErrors((prev) => ({ ...prev, email: '' }));
									}
								}}
								required
							/>
							{fieldErrors.email && <p id="registration-email-error" className="field-error" role="alert">{fieldErrors.email}</p>}
						</div>
					</label>

					<label>
						<span>Password</span>
						<div className='field-control'>
							<input
								className={fieldErrors.password ? 'input-error' : ''}
								aria-invalid={!!fieldErrors.password}
								aria-describedby={fieldErrors.password ? 'registration-password-error' : undefined}
								type="password"
								name="password"
								placeholder="Enter password"
								value={password}
								minLength={12}
								onChange={(e) => {
									setPassword(e.target.value);
									if (fieldErrors.password || fieldErrors.confirmPassword) {
										setFieldErrors((prev) => ({ ...prev, password: '', confirmPassword: '' }));
									}
								}}
								required
							/>
							{fieldErrors.password && <p id="registration-password-error" className="field-error" role="alert">{fieldErrors.password}</p>}
						</div>
					</label>

					<label>
						<span>Re-Type Password</span>
						<div className='field-control'>
							<input
								className={fieldErrors.confirmPassword ? 'input-error' : ''}
								aria-invalid={!!fieldErrors.confirmPassword}
								aria-describedby={fieldErrors.confirmPassword ? 'registration-confirm-password-error' : undefined}
								type="password"
								name="confirmPassword"
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
									if (fieldErrors.confirmPassword) {
										setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }));
									}
								}}
								required
							/>
							{fieldErrors.confirmPassword && <p id="registration-confirm-password-error" className="field-error" role="alert">{fieldErrors.confirmPassword}</p>}
						</div>
					</label>

					{error && <p className="field-error" role="alert">{error}</p>}

					<button type="submit" className="btn-primary" disabled={isSubmitting}>
						{isSubmitting ? 'Creating...' : 'Create account'}
					</button>
				</form>

				<Divider label={"OR"}/>
				<div className='other-links'>
					<p>Have an Account? <span className="link" onClick={() => openLogin()}>Log In.</span></p>
				</div>
			</div>
		</Modal>
		</>
	);
}
