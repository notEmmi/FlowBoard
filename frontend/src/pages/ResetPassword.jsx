import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from '../api';
import './ForgotPassword.css';

export default function ResetPassword() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [token, setToken] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

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

		if (newPassword !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		if (!token) {
			setError('Invalid or missing reset token');
			return;
		}

		setIsSubmitting(true);

		try {
			await confirmPasswordReset({ token, new_password: newPassword });
			setSuccess(true);
			setTimeout(() => navigate('/'), 3000);
		} catch (err) {
			setError(err.message || 'Reset failed. Token may be expired.');
		} finally {
			setIsSubmitting(false);
		}
	}

	if (success) {
		return (
			<div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
				<div className="forgot-password" style={{ maxWidth: '400px', textAlign: 'center' }}>
					<h2>Password Reset Successful</h2>
					<p>You can now log in with your new password.</p>
					<p>Redirecting to login...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
			<div className="forgot-password" style={{ maxWidth: '400px' }}>
				<h2>Reset Your Password</h2>
				<p className='tagline'>Enter your new password below.</p>
				<form className="auth-form" onSubmit={handleSubmit}>
					<label>
						New Password
						<input
							type="password"
							name="password"
							placeholder="Enter new password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
						/>
					</label>

					<label>
						Confirm Password
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm new password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>

					{error && <p className='tagline' style={{ color: 'red' }}>{error}</p>}

					<button type="submit" className="btn-primary" disabled={isSubmitting || !token}>
						{isSubmitting ? 'Resetting...' : 'Reset Password'}
					</button>
				</form>
			</div>
		</div>
	);
}
