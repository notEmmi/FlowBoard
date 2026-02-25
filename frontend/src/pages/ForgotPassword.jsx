import './ForgotPassword.css';
import Modal from '../components/Modal.jsx';
import { use, useState } from 'react';
import { requestPasswordReset } from '../api';
import Alert from "../components/Alerts.jsx";

export default function ForgotPassword ({ isOpen, closeModal, onSwitchToLogin }) {
	// const [isConfirmationOpen, setConfirmationOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validEmail = function(email) {    
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return pattern.test(email);
	}
	
	async function onSend(e) {
		e.preventDefault();
		setError('');
		setSuccess('');
		
		// Email Validation
		if (!email) {
			setError('Email is required.');
			return;
		} else if (!validEmail(email)) {
			setError('Please check your email format. It should look like: username@domain.com');
			return;
		}
		
		setIsSubmitting(true);

		try {
			await requestPasswordReset({ email });
			setSuccess('Thank you for your request. If the submitted email exists, you will receive an email shortly, detailing further proceedings');
			setEmail('');
		} catch (err) {
			setError(err.message || 'Request failed');
		} finally {
			setIsSubmitting(false);
		}
	}


	return (
		<>
		<Modal isOpen={isOpen} onClose={() => closeModal(false)} >
			<div className="forgot-password">
				{error && <Alert type='error'>{error}</Alert>}
				{success && <Alert type='success'>{success}</Alert>}
				<h2>Reset Password</h2>
				<p className='tagline'>Enter the email associated with your account and we'll send you password reset instructions.</p>
				<form className="auth-form" onSubmit={onSend} noValidate>
					<label>
						Email
						<input
							type="email"
							name="email"
							placeholder="you@example.com"
							onChange={(e) => setEmail(e.target.value.trim())

							}
						/>
					</label>
					<button type="submit" className="btn-primary" disabled={isSubmitting}>
						{isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
					</button>
				</form>
				<div className='other-links'>
					<p className='link' onClick={() => onSwitchToLogin()}>Back to Login</p>
				</div>
			</div>
		</Modal>
		</>
	);
}