import { useState } from 'react';
import './Login.css';
import Modal from '../components/Modal.jsx';

export default function Login ( {isOpen, closeModal}) {
	return (
		<Modal isOpen={isOpen} onClose={() => closeModal(false)}>
			<div className="page-container login-page">
					<h1>Welcome Back</h1>
					<p>Access your saved projects.</p>
					<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
						<label>
							Email
							<input type="email" name="email" placeholder="you@example.com" />
						</label>

						<label>
							Password
							<input type="password" name="password" placeholder="••••••••" />
						</label>
						<p>Forgot Password?<span className='link'>Click here.</span></p>

						<button type="submit" className="btn-primary">Login</button>
					</form>

					<div className="half-divider"></div><h2>OR</h2><div className='half-divider'></div>
			</div>
		</Modal>
	);
}