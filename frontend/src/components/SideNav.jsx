import { useNavigate } from 'react-router-dom';
import './SideNav.css';
import { LayoutDashboard, KanbanSquare, Clock, SlidersHorizontal } from 'lucide-react';

function NavItem({ name, icon: Icon, route }) {
	const navigate = useNavigate();
	return(
		<button className='nav-item btn-link' onClick={() => navigate(route)}>
			<Icon/>
			<p>{name}</p>
		</button>	
	)
}

export default function SideNav() {
	const items = [
		{ name: 'All Projects', icon: LayoutDashboard, route: '/dashboard' },
		{ name: 'Board', icon: KanbanSquare, route: '/board' },
		{ name: 'Timeline', icon: Clock, route: '/timeline' },
		{ name: 'Settings', icon: SlidersHorizontal, route: '/settings' }
	];

	return (
		<div className="side-nav-container">
			{items.map((item) => (
				<NavItem
					key={item.name}
					name={item.name}
					icon={item.icon}
					route={item.route}
				/>
			))}
		</div>
	);
}
