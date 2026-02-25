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
		
		// Email Validation
		if (!email.trim()) {
			setError('Email is required.');
			return;
		} else if (!validEmail(email)) {
			setError('Please enter a valid email address. (abc@xyz.com)');
			return;
		}
		
		setIsSubmitting(true);

		try {
			await requestPasswordReset({ email });
			setSuccess('Check your email for reset instructions.');
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
							onChange={(e) => setEmail(e.target.value)

							}
						/>
					</label>

					{error && <p className='tagline'>{error}</p>}

					<button type="submit" className="btn-primary" disabled={isSubmitting}>
						{isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
					</button>
				</form>
				<div className='other-links'>
					<p className='link' onClick={() => onSwitchToLogin()}>Back to Login</p>
				</div>
			</div>
		</Modal>
		{/* <ConfirmationModal isOpen={isConfirmationOpen} closeModal={setConfirmationOpen}/> */}
		</>
	);
}