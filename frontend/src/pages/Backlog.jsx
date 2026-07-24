import { useParams } from 'react-router-dom';
import SecondaryNav from '../components/SecondaryNav.jsx';

export default function Backlog() {
	const { projectId } = useParams();

	return (
		<>
			<SecondaryNav currentView="backlog" />

			<div className="page-container">
				<div className='project-content'>
					<h1>{projectId}</h1>
					<p className='tagline'>Backlog</p>

				</div>
			</div>
		</>
	);
}
