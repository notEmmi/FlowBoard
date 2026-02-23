import { useParams } from 'react-router-dom';
import SecondaryNav from '../components/SecondaryNav.jsx';
import './Project.css';

export default function Settings() {
	const { projectName } = useParams();

	return (
		<>
			<SecondaryNav currentView="settings" />

			<div className="page-container">
				<div className='project-content'>
					<h1>{projectName}</h1>
					<p className='tagline'>Project Settings</p>
				

				</div>
			</div>
		</>
	);
}
