import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function ProjectCard({ projectName, task_number, progress_number, complete_number, update_time }) {
	const navigate = useNavigate();

	return (
		<button className='project-card' onClick={() => navigate(`/project/${projectName}`)}>
			<h3>{projectName}</h3>
			<p><span>{task_number}</span> Tasks</p>
			<p><span>{progress_number}</span> In Progress</p>
			<p><span>{complete_number}</span> Completed</p>
			<p>Last updated <span>{update_time}</span></p>
		</button>
	)
}

export default function Dashboard () {
	const dummy_data = [
		{ name: 'Project Planner', tasks: 20, progress: 3, completed: 2, updated: '6:07PM' },
		{ name: 'Budgetting App', tasks: 4, progress: 0, completed: 1, updated: '1:15AM' },
		{ name: 'Puzzle game', tasks: 40, progress: 0, completed: 0, updated: '2:04PM' },
	]

	return (
		<div className="page-container dashboard">
			<div className='top'>
				<div className='left'>
					<h1>Dashboard</h1>
					<p className='tagline'>Your projects and boards will appear here</p>
				</div>
				<div className='right'>
					<button className='btn-primary'>Add Project +</button>
				</div>
			</div>

			<div className='projects-board'>
				{dummy_data.length > 0 ? (
					dummy_data.map((project) => (
						<ProjectCard 
							key={project.name}
							projectName={project.name}
							task_number={project.tasks}
							progress_number={project.progress}
							complete_number={project.completed}
							update_time={project.updated}
						/>
					))
				) : (
					<p><b>No projects yet. Click "Add Project" to get started!</b></p>
				)}
			</div>

		</div>
	);
}
