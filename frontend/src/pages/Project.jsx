import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Project.css'
import SecondaryNav from '../components/SecondaryNav.jsx';
import { getProjectById } from '../api.jsx';

function TaskCard({ task }) {
	return (
		<div className='project-card'>
			<p className='project-card-title'>
				<b>{task.id}. {task.title}</b>
			</p>
			<p className='project-card-description caption'>
				{task.description}
			</p>
			<div className='project-card-tags'>
				{task.tags && task.tags.map((tag, index) => (
					<span 
						key={index}
						className='project-card-tag'
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
			<p className='section-label'><b>{name}</b></p>
			<div className='project-section-cards'>
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	);
}

export default function Project() {
	const { projectId } = useParams();
	
	// get project data based on projectId
	const [projectData, setProjectData] = useState(null);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const data = await getProjectById(projectId);
				setProjectData(data);
			} catch (error) {
				console.error('Failed to fetch project:', error);
			}
		};
		
		fetchProject();
	}, [projectId]);

	const projectName = projectData?.name || 'Project';

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