import { useParams } from 'react-router-dom';
import SecondaryNav from '../components/SecondaryNav.jsx';
import './Project.css';

export default function Timeline() {
	const { projectName } = useParams();

	return (
		<>
			<SecondaryNav currentView="timeline" />

			<div className="page-container">
				<div className='project-content'>
					<h1>{projectName} - Timeline</h1>
					
					<div className='timeline-content'>
						<p>Project timeline will be displayed here.</p>
					</div>

				</div>
			</div>
		</>
	);
}
