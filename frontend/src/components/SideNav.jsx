import { useNavigate } from 'react-router-dom';
import './SideNav.css';
import { LayoutDashboard, KanbanSquare, Clock, SlidersHorizontal } from 'lucide-react';



const navItem = function(name, icon, route) {
	const navigate = useNavigate();
	const Icon = icon;
	return(
		<button className='nav-item btn-link' onClick={() => navigate(route)}>
			<Icon/>
			<p>{name}</p>
		</button>	
	)
}

export default function SideNav() {
	const items = [
		navItem('All Projects', LayoutDashboard, '/dashboard'),
		navItem('Board', KanbanSquare, '/board'),
		navItem('Timeline', Clock, '/timeline'),
		navItem('Settings', SlidersHorizontal, '/settings')
	];


	return (
		<div className="side-nav-container">
			{ items }
		</div>
	);
}
