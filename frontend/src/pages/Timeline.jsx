import { useParams } from 'react-router-dom';
import SecondaryNav from '../components/SecondaryNav.jsx';

export default function Timeline() {
	const { projectId } = useParams();

	return (
		<>
			<SecondaryNav currentView="timeline" />

			<div className="page-container">
				<div className='project-content'>
					<h1>{projectId}</h1>
					<p className='tagline'>Project Timeline</p>

				</div>
			</div>
		</>
	);
}
