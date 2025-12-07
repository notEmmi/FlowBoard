import './Dashboard.css';
import { useNavigate } from 'react-router-dom';


const project = function(projectName, task_number, progress_number, complete_number, update_time) {
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
		project('Project Planner', 20, 3, 2, '6:07PM'),
		project('Budgetting App', 4, 0, 1, '1:15AM'),
		project('Puzzle game', 40, 0, 0, '2:04PM'),
	]


	return (
		<div className="page-container dashboard">
			<div className='top'>
				<div className='left'>
					<h1>Dashboard</h1>
					<h2>Your projects and boards will appear here</h2>
				</div>
				<div className='right'>
					<button className='btn-primary'>Add Project +</button>
				</div>
			</div>

			<div className='project-board'>
				{dummy_data}
			</div>

		</div>
	);
}
