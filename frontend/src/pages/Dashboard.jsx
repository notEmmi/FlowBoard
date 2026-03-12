import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { createProject } from '../api.jsx';
import Alert from '../components/Alerts.jsx';

function AddProject({ isOpen, closeModal }) {
	const [projectName, setProjectName] = useState('');
	const [nameError, setNameError] = useState('');
	const [error, setError] = useState('');
	const [isCreating, setIsCreating] = useState(false);

	useEffect(() => {
		if (!isOpen) {
			return;
		}
		setProjectName('');
		setNameError('');
		setError('');
	}, [isOpen]);

	function validateProjectName(name)  {
		const isValid = true;

		const trimmedName = name.trim();
		if (!trimmedName) {
			setNameError('Project name is required.');
			isValid = false;
		}
		if (trimmedName.length > 50) {
			setNameError('Project name must be 50 characters or fewer.');
			isValid = false;
		}

		return isValid;
	};

	async function handleAddProject(e) {
		e.preventDefault();
		setError('');
		setNameError('');

		if (!validateProjectName(projectName)) {
			return;
		}

		setIsCreating(true);

		try {
			await createProject({ name: projectName });
			setProjectName('');
			closeModal(false);
		} catch (error) {
			setError('Failed to create project.');
		} finally {
			setIsCreating(false);
		}
	};

	return (
		<>
		<Modal isOpen={isOpen} onClose={() => closeModal(false)}>
			<div className="add-project">
				<h2>New Project</h2>
				{error && <Alert type="error" message={error} />}
				<form onSubmit={handleAddProject}>
					<label>
						Project Name
						<div className='field-control'>

							<input
								className={nameError ? 'input-error' : ''}
								type="text"
								placeholder="Enter project name"
								value={projectName}
								onChange={(e) => setProjectName(e.target.value)}
								autoFocus
							/>
							{nameError && <p className="field-error" role="alert">{nameError}</p>}
						</div>
					</label>
					<button className="btn-primary" type="submit" disabled={isCreating}>
						{isCreating ? 'Creating...' : 'Create Project'}
					</button>
				</form>
			</div>
		</Modal>
		</>
	);
}

function ProjectCard({ projectName, task_number, progress_number, testing_number, complete_number, update_time }) {
	const navigate = useNavigate();
	const totalTasks = task_number + progress_number + testing_number + complete_number;
	const completedPercent = totalTasks > 0 ? (complete_number / totalTasks) * 100 : 0;

	return (
		<button className='project-card' onClick={() => navigate(`/project/${projectName}`)}>
			<h3>{projectName}</h3>
			<div className='card-tags'>
				<div className='tag tag-tasks'>
					<p className='caption'>{task_number} Planned</p>

				</div>
				<div className='tag tag-progress'>
					<p className='caption'>{progress_number} In Progress</p>
				</div>			
				<div className='tag tag-testing'>
					<p className='caption'>{testing_number} Testing</p>

				</div>
				<div className='tag tag-completed'>
					<p className='caption'>{complete_number} Completed</p>
				</div>
			</div>
			<p className='caption'>Last updated {update_time}</p>
			<div className='progress-bar'>
				<div className='progress-segment segment-completed' style={{ width: `${completedPercent}%` }}></div>
			</div>
		</button>
	)
}

export default function Dashboard () {
	const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

	const dummy_data = [
		{ name: 'Project Planner', tasks: 20, progress: 3, testing: 5, completed: 3, updated: '6:07PM' },
		{ name: 'Budgetting App', tasks: 2, progress: 1, testing: 2, completed: 5, updated: '1:15AM' },
		{ name: 'Puzzle game', tasks: 1, progress: 0, testing: 0, completed: 9, updated: '2:04PM' },
		{ name: 'Mobile App', tasks: 25, progress: 8, testing: 12, completed: 25, updated: '3:45PM' },
	]

	return (
		<>
		<div className="page-container dashboard">
			<div className='top'>
				<div className='left'>
					<h1>Dashboard</h1>
					<p className='tagline'>Your projects and boards will appear here</p>
				</div>
				<div className='right'>
					<button className='btn-primary' onClick={() => setIsAddProjectOpen(true)}>Add Project +</button>
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
							testing_number={project.testing}
							complete_number={project.completed}
							update_time={project.updated}
						/>
					))
				) : (
					<p><b>No projects yet. Click "Add Project" to get started!</b></p>
				)}
			</div>

		</div>

		<AddProject isOpen={isAddProjectOpen} closeModal={setIsAddProjectOpen} />
	</>
	);
}
