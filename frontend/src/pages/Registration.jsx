import './Registration.css';
import Modal from '../components/Modal.jsx';

export default function Registration ({isOpen, closeModal}) {
	return (
		<Modal isOpen={isOpen} onClose={() => closeModal(false)} >
			<div className="page-container registration-page">
				<h1>Create account</h1>
				<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
					<label>
						Full name
						<input type="text" name="name" placeholder="Your name" />
					</label>

					<label>
						Email
						<input type="email" name="email" placeholder="you@example.com" />
					</label>

					<label>
						Password
						<input type="password" name="password" placeholder="Create a password" />
					</label>

					<button type="submit" className="btn-primary">Create account</button>
				</form>
		</div>
		</Modal>
	);
}
