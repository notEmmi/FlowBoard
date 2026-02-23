import './Registration.css';
import Modal from '../components/Modal.jsx';
import Divider from '../components/Divider.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login, register } from '../api';

export default function Registration ({isOpen, closeModal, onSwitchToLogin, onAuthSuccess}) {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	function openLogin() {
		if (onSwitchToLogin) {
			closeModal(false);
			onSwitchToLogin();
		}
	}

	async function authenticate(e) {
		e.preventDefault();
		setError('');

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		setIsSubmitting(true);

		try {
			await register({ username, email, password });
			await login({ email, password });
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
				<form className="auth-form" onSubmit={authenticate}>
					<label>
						Username
						<input
							type="text"
							name="name"
							placeholder="Enter username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>

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

					<label>
						Password
						<input
							type="password"
							name="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>

					<label>
						Re-Type Password
						<input
							type="password"
							name="confirmPassword"
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>

					{error && <p className='tagline'>{error}</p>}

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
