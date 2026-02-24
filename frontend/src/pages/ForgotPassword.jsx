import './ForgotPassword.css';
import Modal from '../components/Modal.jsx';
import { useState } from 'react';
import { requestPasswordReset } from '../api';

function ConfirmationModal ({isOpen, closeModal}) {
	return(
		<Modal isOpen={isOpen} onClose={() => closeModal(false)}>
			<div className='forgot-password'>
				<h2>Reset Password</h2>
				<p>Check your email for reset instructions.</p>
			</div>
		</Modal>
	)
}

export default function ForgotPassword ({ isOpen, closeModal, onSwitchToLogin }) {
	const [isConfirmationOpen, setConfirmationOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	
	async function onSend(e) {
		e.preventDefault();
		setError('');
		setIsSubmitting(true);

		try {
			await requestPasswordReset({ email });
			closeModal(false);
			setConfirmationOpen(true);
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
				<h2>Reset Password</h2>
				<p className='tagline'>Enter the email associated with your account and we'll send you password reset instructions.</p>
				<form className="auth-form" onSubmit={onSend}>
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
		<ConfirmationModal isOpen={isConfirmationOpen} closeModal={setConfirmationOpen}/>
		</>
	);
}