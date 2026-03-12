import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from '../api';
import './Auth.css';
import Modal from '../components/Modal.jsx';
import Landing from './Landing';
import Alert from '../components/Alerts.jsx';

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

export default function ResetPassword() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [token, setToken] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isResetSuccessful, setIsResetSuccessful] = useState(false);

	useEffect(() => {
		const tokenFromUrl = searchParams.get('token');
		if (!tokenFromUrl) {
			setError('Invalid reset link');
		} else {
			setToken(tokenFromUrl);
		}
	}, [searchParams]);

	async function handleSubmit(e) {
		e.preventDefault();
		setError('');
		setPasswordError('');
		setConfirmPasswordError('');

		const nextErrors = {
			password: '',
			confirmPassword: '',
		};
		let isValid = true;
		const password = newPassword;
		const passwordLower = password.toLowerCase();
		const usernameLower = (searchParams.get('username') || '').trim().toLowerCase();
		const emailLower = (searchParams.get('email') || '').trim().toLowerCase();
		const emailLocalPart = emailLower.split('@')[0] || '';

		if (!password) {
			nextErrors.password = 'Password is required.';
			isValid = false;
		} else if (password.length < 8) {
			nextErrors.password = 'Password must be at least 8 characters.';
			isValid = false;
		} else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
			nextErrors.password = 'Password must include uppercase, lowercase, and number.';
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

		if (!isValid) {
			setPasswordError(nextErrors.password);
			setConfirmPasswordError(nextErrors.confirmPassword);
			return;
		}

		if (!token) {
			setError('Invalid or missing reset token');
			return;
		}

		setIsSubmitting(true);

		try {
			await confirmPasswordReset({ token, new_password: password });
			setIsResetSuccessful(true);
			setNewPassword('');
			setConfirmPassword('');
		} catch (err) {
			setError(err?.userMessage || err?.message || 'Reset failed. Token may be expired.');
		} finally {
			setIsSubmitting(false);
		}
	}

	function openLoginModal() {
		navigate('/landing?login=1');
	}

	return (
		<>
			<Landing />
			<Modal isOpen={true} onClose={() => navigate('/landing')}>
				<div className="forgot-password">
					<h2>Reset Your Password</h2>
					{isResetSuccessful ? (
						<>
							<p className='tagline'>You can now sign in with your new password.</p>
							<Alert type='success'>Password successfully reset.</Alert>							
							<button type="button" className="btn-primary" onClick={openLoginModal}>
								Click to Sign In
							</button>
						</>
					) : (
						<>
							<p className='tagline'>Enter your new password below.</p>
							<form className="auth-form" onSubmit={handleSubmit} noValidate>
						<label>
							<span>New Password</span>
							<div className='field-control'>
								<input
									className={passwordError ? 'input-error' : ''}
									aria-invalid={!!passwordError}
									aria-describedby={passwordError ? 'reset-password-error' : undefined}
									type="password"
									name="password"
									placeholder="Enter new password"
									value={newPassword}
									minLength={8}
									onChange={(e) => {
										setNewPassword(e.target.value);
										if (passwordError || confirmPasswordError) {
											setPasswordError('');
											setConfirmPasswordError('');
										}
									}}
									required
								/>
								{passwordError && <p id="reset-password-error" className="field-error" role="alert">{passwordError}</p>}
							</div>
						</label>

						<label>
							<span>Confirm Password</span>
							<div className='field-control'>
								<input
									className={confirmPasswordError ? 'input-error' : ''}
									aria-invalid={!!confirmPasswordError}
									aria-describedby={confirmPasswordError ? 'reset-confirm-password-error' : undefined}
									type="password"
									name="confirmPassword"
									placeholder="Confirm new password"
									value={confirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
										if (confirmPasswordError) {
											setConfirmPasswordError('');
										}
									}}
									required
								/>
								{confirmPasswordError && <p id="reset-confirm-password-error" className="field-error" role="alert">{confirmPasswordError}</p>}
							</div>
						</label>

						{error && <p className="field-error" role="alert">{error}</p>}

						<button type="submit" className="btn-primary" disabled={isSubmitting || !token}>
							{isSubmitting ? 'Resetting...' : 'Reset Password'}
						</button>
							</form>
						</>
					)}
				</div>
			</Modal>
		</>
	);
}
