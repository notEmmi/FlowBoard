import { useState } from 'react';
import './Registration.css';
import Modal from '../components/Modal.jsx';
import Divider from '../components/Divider.jsx';
import Login from './Login.jsx'
import { useNavigate } from 'react-router-dom';

export default function Registration ({isOpen, closeModal}) {
	const navigate = useNavigate();
	const [isLoginOpen, setIsLoginOpen] = useState(false);

	function openLogin() {
		closeModal(false);
		setIsLoginOpen(true);
	}

	function authenticate() {
		navigate('/Dashboard');
		closeModal(false);
	}
	
	return (
		<>
		<Modal isOpen={isOpen} onClose={() => closeModal(false)} >
			<div className="page-container registration">
				<h2>Create an Account</h2>
				<p className='tagline'>Keep your projects safe and accessible anytime</p>
				<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
					<label>
						Username
						<input type="text" name="name" placeholder="johndoe" />
					</label>

					<label>
						Email
						<input type="email" name="email" placeholder="you@example.com" />
					</label>

					<label>
						Password
						<input type="password" name="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
					</label>

					<label>
						Re-Type Password
						<input type="password" name="password" placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' />
					</label>

					<button type="submit" className="btn-primary" onClick={() => authenticate()}>Create account</button>
				</form>

				<Divider label={"OR"}/>
				<div className='other-links'>
					<p>Have an Account? <span class="link" onClick={() => openLogin()}>Log In.</span></p>
				</div>
			</div>
		</Modal>
		<Login isOpen={isLoginOpen} closeModal={setIsLoginOpen}/>
		</>
	);
}
