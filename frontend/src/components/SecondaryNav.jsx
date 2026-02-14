import { useNavigate } from 'react-router-dom';
import './SecondaryNav.css';
import { LayoutDashboard, KanbanSquare, Clock, SlidersHorizontal } from 'lucide-react';

function NavItem({ name, icon: Icon, route }) {
	const navigate = useNavigate();
	return(
		<button className='nav-item' onClick={() => navigate(route)}>
			<Icon className="icon"/>
			<p className='caption'>{name}</p>
		</button>	
	)
}

export default function SecondaryNav() {

	const items = [
		{ name: 'Project', icon: KanbanSquare, route: '/board' },
		{ name: 'Backlog', icon: KanbanSquare, route: '/backlog' },
		{ name: 'Timeline', icon: Clock, route: '/timeline' },
		{ name: 'Settings', icon: SlidersHorizontal, route: '/settings' }
	];

	return (
		<div className="second-nav-container">
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
