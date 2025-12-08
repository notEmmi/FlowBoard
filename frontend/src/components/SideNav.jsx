import { useNavigate } from 'react-router-dom';
import './SideNav.css';
import { LayoutDashboard } from 'lucide-react';



const navItem = function(name, icon, route) {
	const navigate = useNavigate();
	const Icon = icon;
	return(
		<div className='nav-item'>
			<Icon/>
			<button onClick={() => navigate(route)}>{name}</button>
		</div>	
	)
}

export default function SideNav() {
	const items = [
		navItem('Dashboard', LayoutDashboard, '/dashboard'),
		navItem('Project Board', LayoutDashboard, '/#'),
		navItem('Timeline', LayoutDashboard, '/#'),
		navItem('Project Setting', LayoutDashboard, '/#'),
		nav
	]

	return (
		<nav className="side-nav-container">
			{ items }
		</nav>
	);
}
