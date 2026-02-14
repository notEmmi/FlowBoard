import { useParams } from 'react-router-dom';
import './Project.css'
import SecondaryNav from '../components/SecondaryNav.jsx';

function TaskCard({ task }) {
	return (
		<div className='project-card'>
			<h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-heading)' }}>
				{task.title}
			</h4>
			{task.description && (
				<p style={{ margin: '0 0 12px 0', fontSize: '12px', color: 'var(--text-body)', lineHeight: '1.4' }}>
					{task.description}
				</p>
			)}
			<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
				{task.tags && task.tags.map((tag, index) => (
					<span 
						key={index}
						style={{ 
							fontSize: '10px', 
							padding: '4px 8px', 
							borderRadius: '4px',
							backgroundColor: 'var(--ui-sidebar)',
							color: 'var(--text-caption)',
							fontWeight: '500'
						}}
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
}

function ProjectSection({ name, tasks }) {
	return (
		<div className='project-section'>
			<p><b>{name}</b></p>
			<div className='project-section-cards'>
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	);
}

export default function Project() {
	const { projectName } = useParams();

	// Dummy task data
	const dummyTasks = {
		planned: [
			{
				id: 1,
				title: 'User Authentication System',
				description: 'Implement JWT-based authentication with login and registration',
				tags: ['Backend', 'Security']
			},
			{
				id: 2,
				title: 'Database Schema Design',
				description: 'Design and document the database structure for the application',
				tags: ['Database', 'Design']
			},
			{
				id: 3,
				title: 'API Documentation',
				description: 'Create comprehensive API documentation using Swagger',
				tags: ['Documentation']
			}
		],
		inProgress: [
			{
				id: 4,
				title: 'Dashboard UI Components',
				description: 'Build reusable React components for the dashboard interface',
				tags: ['Frontend', 'React']
			},
			{
				id: 5,
				title: 'Project Board Functionality',
				description: 'Implement drag-and-drop for task cards and state management',
				tags: ['Frontend', 'Feature']
			}
		],
		review: [
			{
				id: 6,
				title: 'Responsive Navigation',
				description: 'Review mobile responsiveness of navigation components',
				tags: ['Frontend', 'CSS']
			},
			{
				id: 7,
				title: 'User Profile Page',
				description: 'Code review for user profile implementation',
				tags: ['Frontend', 'Review']
			}
		],
		complete: [
			{
				id: 8,
				title: 'Project Setup',
				description: 'Initialize React and Python Flask project structure',
				tags: ['Setup']
			},
			{
				id: 9,
				title: 'Color Palette & Design System',
				description: 'Establish CSS variables and design guidelines',
				tags: ['Design', 'CSS']
			},
			{
				id: 10,
				title: 'Docker Configuration',
				description: 'Setup Docker containers for frontend and backend',
				tags: ['DevOps']
			}
		]
	};

	return (
		<>
			<SecondaryNav currentView="board" />

			<div className="page-container project">
				<div className='top'>
					<h1>{projectName}</h1>
					<p className='tagline'>Project Board</p>
					<p className='caption'>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
					<button className='btn-primary'>Add Task</button>
				</div>
				
				<div className='project-board'>
					<ProjectSection name='Planned' tasks={dummyTasks.planned} />
					<ProjectSection name='In Progress' tasks={dummyTasks.inProgress} />
					<ProjectSection name='Review' tasks={dummyTasks.review} />
					<ProjectSection name='Complete' tasks={dummyTasks.complete} />
				</div>

			</div>
		</>
	);
};