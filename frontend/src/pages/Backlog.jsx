import { useParams } from 'react-router-dom';
import SecondaryNav from '../components/SecondaryNav.jsx';
import './Project.css';

export default function Backlog() {
	const { projectName } = useParams();

	return (
		<>
			<SecondaryNav currentView="backlog" />

			<div className="page-container">
				<div className='project-content'>
					<h1>{projectName} - Backlog</h1>
					
					<div className='backlog-content'>
						<p>Backlog items will be displayed here.</p>
					</div>

				</div>
			</div>
		</>
	);
}
