import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { createProject, getProjects } from '../api.jsx';
import Alert from '../components/Alerts.jsx';

function AddProject({ isOpen, closeModal, onCreated }) {
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
		let isValid = true;

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
			const project = await createProject({ name: projectName.trim() });
			onCreated(project);
			setProjectName('');
			closeModal(false);
		} catch (error) {
			setError(error.userMessage || 'Failed to create project.');
		} finally {
			setIsCreating(false);
		}
	};

	return (
		<>
		<Modal isOpen={isOpen} onClose={() => closeModal(false)}>
			<div className="add-project">
				<h2>New Project</h2>
				{error && <Alert type="error">{error}</Alert>}
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

function formatUpdatedAt(timestamp) {
	if (!timestamp) {
		return 'just now';
	}

	const date = new Date(timestamp);
	if (Number.isNaN(date.getTime())) {
		return 'just now';
	}

	return date.toLocaleString([], {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	});
}

function ProjectCard({ projectId, projectName, task_number, progress_number, testing_number, complete_number, update_time }) {
	const navigate = useNavigate();
	const totalTasks = task_number + progress_number + testing_number + complete_number;
	const completedPercent = totalTasks > 0 ? (complete_number / totalTasks) * 100 : 0;

	return (
		<button className='project-card' onClick={() => navigate(`/project/${projectId}`)}>
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
			<p className='caption'>Last updated {formatUpdatedAt(update_time)}</p>
			<div className='progress-bar'>
				<div className='progress-segment segment-completed' style={{ width: `${completedPercent}%` }}></div>
			</div>
		</button>
	)
}

export default function Dashboard () {
	const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
	const [projects, setProjects] = useState([]);
	const [loadError, setLoadError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		async function loadProjects() {
			setIsLoading(true);
			setLoadError('');

			try {
				const data = await getProjects();
				if (!isMounted) {
					return;
				}
				setProjects(Array.isArray(data) ? data : []);
			} catch (error) {
				if (!isMounted) {
					return;
				}
				setLoadError(error.userMessage || 'Failed to load projects.');
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		loadProjects();

		return () => {
			isMounted = false;
		};
	}, []);

	function handleProjectCreated(project) {
		setProjects((currentProjects) => [project, ...currentProjects]);
	}

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
				{loadError ? (
					<Alert type="error">{loadError}</Alert>
				) : isLoading ? (
					<p><b>Loading projects...</b></p>
				) : projects.length > 0 ? (
					projects.map((project) => (
						<ProjectCard 
							key={project.id}
							projectId={project.id}
							projectName={project.name}
							task_number={project.tasks ?? 0}
							progress_number={project.progress ?? 0}
							testing_number={project.testing ?? 0}
							complete_number={project.completed ?? 0}
							update_time={project.updated_at}
						/>
					))
				) : (
					<p><b>No projects yet. Click "Add Project" to get started!</b></p>
				)}
			</div>

		</div>

		<AddProject isOpen={isAddProjectOpen} closeModal={setIsAddProjectOpen} onCreated={handleProjectCreated} />
	</>
	);
}
