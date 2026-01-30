import './Login.css';
import Modal from '../components/Modal.jsx';
import Divider from '../components/Divider.jsx';
import { useNavigate } from 'react-router-dom';

export default function Login ( {isOpen, closeModal}) {
	const navigate = useNavigate();

	function authenticate() {
		navigate('/Dashboard');
		closeModal();
	}

	return (
		<Modal isOpen={isOpen} onClose={() => closeModal(false)}>
			<div className="page-container login">
					<h2>Welcome Back</h2>
					<p className='tagline'>Access your saved projects.</p>
					<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
						<label>
							Email
							<input type="email" name="email" placeholder="you@example.com" />
						</label>

						<label>
							Password
							<input type="password" name="password" placeholder="••••••••" />
						</label>

						<button type="submit" className="btn-primary" onClick={() => authenticate()}>Login</button>
					</form>

					<Divider label={"OR"}/>
					<div>
						<p>Forgot Password? <span className='link'>Click here</span>.</p>
					</div>
			</div>
		</Modal>
	);
}