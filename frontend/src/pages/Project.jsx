import { useParams } from 'react-router-dom';
import './Project.css'
import SecondaryNav from '../components/SecondaryNav.jsx';


function ProjectSection({ name }) {
	return (
		<div className='project-section'>
			<h3>{name}</h3>

		</div>
	);
}

export default function Project() {

	const { projectName } = useParams();

	return (
		<div className="project-container">
			<SecondaryNav />
			<div className='container'>
				<h1>{projectName}</h1>
				
				<div className='board'>
					<ProjectSection name='Planned'/>
					<ProjectSection name='In Progress'/>
					<ProjectSection name='Review'/>
					<ProjectSection name='Complete'/>
				</div>

			</div>
		</div>
	);
};