import { useParams } from 'react-router-dom';
import './Project.css'
import SecondaryNav from '../components/SecondaryNav.jsx';


function ProjectSection({ name }) {
	return (
		<div className='project-section'>
			<p>{name}</p>
			<div className='project-section-cards'>
				<div className='project-card'>

				</div>
			</div>

		</div>
	);
}

export default function Project() {
	const { projectName } = useParams();
	return (
		<>
			<SecondaryNav currentView="board" />

			<div className="page-container">
				<h1>{projectName}</h1>
				<p className='tagline'>Project Board</p>
				<p className='caption'>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
				
				
				<div className='project-board'>
					<ProjectSection name='Planned'/>
					<ProjectSection name='In Progress'/>
					<ProjectSection name='Review'/>
					<ProjectSection name='Complete'/>
				</div>

			</div>
		</>
	);
};