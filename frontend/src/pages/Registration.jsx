import './Registration.css';
import Modal from '../components/Modal.jsx';
import Divider from '../components/Divider.jsx';

export default function Registration ({isOpen, closeModal}) {
	return (
		<Modal isOpen={isOpen} onClose={() => closeModal(false)} >
			<div className="page-container registration">
				<h2>Create an Account</h2>
				<p className='tagline'>Keep your projects safe and accessible anytime</p>
				<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
					<label>
						Username
						<input type="text" name="name" placeholder="Create a username" />
					</label>

					<label>
						Email
						<input type="email" name="email" placeholder="you@example.com" />
					</label>

					<label>
						Password
						<input type="password" name="password" placeholder="Create a password" />
					</label>

					<label>
						Re-Type Password
						<input type="password" name="password" placeholder='Confirm password' />
					</label>

					<button type="submit" className="btn-primary">Create account</button>
				</form>

				<Divider label={"OR"}/>
		</div>
		</Modal>
	);
}
