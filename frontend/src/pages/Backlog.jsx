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
					<h1>{projectName}</h1>
					<p className='tagline'>Backlog</p>

				</div>
			</div>
		</>
	);
}
