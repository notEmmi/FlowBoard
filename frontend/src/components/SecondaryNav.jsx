import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './SecondaryNav.css';
import { LayoutDashboard, KanbanSquare, Clock, SlidersHorizontal, List } from 'lucide-react';

function NavItem({ name, icon: Icon, route, isActive }) {
	const navigate = useNavigate();
	return(
		<button 
			className={`nav-item ${isActive ? 'active' : ''}`} 
			onClick={() => navigate(route)}
		>
			<Icon className="icon"/>
			<p className='caption'>{name}</p>
		</button>	
	)
}

export default function SecondaryNav({ currentView }) {
	const { projectId } = useParams();
	const location = useLocation();

	// Determine current view from location if not provided
	const activeView = currentView || (() => {
		if (location.pathname.includes('/backlog')) return 'backlog';
		if (location.pathname.includes('/timeline')) return 'timeline';
		if (location.pathname.includes('/settings')) return 'settings';
		return 'board';
	})();

	const items = [
		{ name: 'Project', icon: KanbanSquare, route: `/project/${projectId}`, view: 'board' },
		{ name: 'Backlog', icon: List, route: `/project/${projectId}/backlog`, view: 'backlog' },
		{ name: 'Timeline', icon: Clock, route: `/project/${projectId}/timeline`, view: 'timeline' },
		{ name: 'Settings', icon: SlidersHorizontal, route: `/project/${projectId}/settings`, view: 'settings' }
	];

	return (
		<div className="second-nav-container">
			{items.map((item) => (
				<NavItem
					key={item.name}
					name={item.name}
					icon={item.icon}
					route={item.route}
					isActive={activeView === item.view}
				/>
			))}
		</div>
	);
}
