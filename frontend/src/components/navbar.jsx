import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
	return (
		<nav className="navbar">
			<div className="nav-left">
				<Link to="/" className="nav-item">
					<span aria-hidden>🏠</span> <span className='nav-label'>Home</span>
				</Link>
				<Link to="/landing" className="nav-item">
					<span aria-hidden>📌</span> <span className='nav-label'>Landing</span>
				</Link>
			</div>

			<div className="nav-right">
				<Link to="/login" className="nav-item">
					<span aria-hidden>🔐</span> <span className='nav-label'>Login</span>
				</Link>
				<Link to="/register" className="nav-item">
					<span aria-hidden>➕</span> <span className='nav-label'>Register</span>
				</Link>
			</div>
		</nav>
	);
}