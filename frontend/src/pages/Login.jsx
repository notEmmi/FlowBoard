import './Login.css';

export default function Login () {
	return (
		<div className="page-container login-page">
			<h1>Sign in</h1>
			<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
				<label>
					Email
					<input type="email" name="email" placeholder="you@example.com" />
				</label>

				<label>
					Password
					<input type="password" name="password" placeholder="••••••••" />
				</label>

				<button type="submit" className="btn-primary">Sign in</button>
			</form>
		</div>
	);
}