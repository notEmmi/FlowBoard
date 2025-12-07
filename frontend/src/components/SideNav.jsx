import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function SideNav() {
	const navigate = useNavigate();

	return (
		<nav className="navbar">
			<div className='nav-item'>
				<button onClick={() => navigate('/')}>Home</button>
			</div>
			<div className='nav-item'>
				<button onClick={() => navigate('/dashboard')}>DashBoard</button>
			</div>
			<div className='nav-item'>
				
			</div>
		</nav>
	);
}
