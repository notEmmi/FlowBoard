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
					<h1>{projectName}</h1>
					<p className='tagline'>Project Timeline</p>

				</div>
			</div>
		</>
	);
}
