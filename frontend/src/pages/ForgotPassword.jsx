import './ForgotPassword.css';
import Modal from '../components/Modal.jsx';
import { useState } from 'react';

function ConfirmationModal ({isOpen, closeModal}) {
	return(
		<Modal isOpen={isOpen} onClose={() => closeModal(false)}>
			<div className='page-container forgot-password'>
				<h2>Reset Password</h2>
				<p>Check your email for reset intructions.</p>
			</div>
		</Modal>
	)
}

export default function ForgotPassword ({ isOpen, closeModal, onSwitchToLogin }) {
	const [isConfirmationOpen, setConfirmationOpen] = useState(false)
	
	function onSend(){
		closeModal(false);
		setConfirmationOpen(true);
	}


	return (
		<>
		<Modal isOpen={isOpen} onClose={() => closeModal(false)} >
			<div className="page-container forgot-password">
				<h2>Reset Password</h2>
				<p className='tagline'>Enter the email associated with your account and we'll send you password reset instructions.</p>
				<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
					<label>
						Email
						<input type="email" name="email" placeholder="you@example.com" />
					</label>

					<button type="submit" className="btn-primary" onClick={() => onSend()}>Send Reset Instructions</button>
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