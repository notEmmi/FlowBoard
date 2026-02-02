import './ForgotPassword.css';
import Modal from '../components/Modal.jsx';

export default function ForgotPassword ({ isOpen, closeModal, onSwitchToLogin }) {
	return (
		<Modal isOpen={isOpen} onClose={closeModal} >
			<div className="page-container forgot-password">
				<h2>Reset Your Password</h2>
				<p className='tagline'>Enter the email associated with your account and we'll send you password reset instructions.</p>
				<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
					<label>
						Email
						<input type="email" name="email" placeholder="you@example.com" />
					</label>

					<button type="submit" className="btn-primary">Send Reset Instructions</button>
				</form>
				<div className='other-links'>
					<p className='link' onClick={() => onSwitchToLogin()}>Back to Login</p>
				</div>
			</div>
		</Modal>
	);
}