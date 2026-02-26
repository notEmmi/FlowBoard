import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from '../api';
import './Auth.css';
import Modal from '../components/Modal.jsx';
import Landing from './Landing';

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

	useEffect(() => {
		const tokenFromUrl = searchParams.get('token');
		if (!tokenFromUrl) {
			setError('Invalid reset link');
		} else {
			setToken(tokenFromUrl);
		}
	}, [searchParams]);

	function validatePasswordPolicy(passwordValue) {
		const passwordLower = passwordValue.toLowerCase();
		const usernameHint = (searchParams.get('username') || '').trim().toLowerCase();
		const emailHint = (searchParams.get('email') || '').trim().toLowerCase();
		const emailLocalPart = emailHint.split('@')[0] || '';

		if (!passwordValue) {
			return 'Password is required.';
		}

		if (passwordValue.length < 8) {
			return 'Password must be at least 8 characters.';
		}

		if (!/[A-Z]/.test(passwordValue) || !/[a-z]/.test(passwordValue) || !/[0-9]/.test(passwordValue)) {
			return 'Password must include uppercase, lowercase, and number.';
		}

		if (COMMON_PASSWORDS.includes(passwordLower)) {
			return 'This password is too common. Choose a stronger one.';
		}

		if ((usernameHint.length >= 3 && passwordLower.includes(usernameHint)) || (emailHint && passwordLower.includes(emailHint)) || (emailLocalPart.length >= 3 && passwordLower.includes(emailLocalPart))) {
			return 'Password cannot contain your username or email.';
		}

		return '';
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setError('');
		setPasswordError('');
		setConfirmPasswordError('');

		const nextPasswordError = validatePasswordPolicy(newPassword);
		if (nextPasswordError) {
			setPasswordError(nextPasswordError);
			return;
		}

		if (!confirmPassword) {
			setConfirmPasswordError('Please confirm your password.');
			return;
		}

		if (newPassword !== confirmPassword) {
			setConfirmPasswordError('Passwords do not match.');
			return;
		}

		if (!token) {
			setError('Invalid or missing reset token');
			return;
		}

		setIsSubmitting(true);

		try {
			await confirmPasswordReset({ token, new_password: newPassword });
			navigate('/landing?login=1');
		} catch (err) {
			setError(err.message || 'Reset failed. Token may be expired.');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<>
			<Landing />
			<Modal isOpen={true} onClose={() => navigate('/landing')}>
				<div className="forgot-password">
					<h2>Reset Your Password</h2>
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
				</div>
			</Modal>
		</>
	);
}
