import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from '../api';
import './ForgotPassword.css';
import Modal from '../components/Modal.jsx';
import Landing from './Landing';

export default function ResetPassword() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [token, setToken] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
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
			</Modal>
		</>
	);
}
