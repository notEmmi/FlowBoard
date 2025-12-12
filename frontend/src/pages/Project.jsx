import { useParams } from 'react-router-dom';
import './Project.css'
import SideNav from '../components/SideNav';


function ProjectSection({ name }) {
	return (
		<div className='project-section'>
			<h2>{name}</h2>
			<hr/>

		</div>
	);
}

export default function Project() {

	const { projectName } = useParams();

	return (
		<div className="page-container project">
			<SideNav />
			<div className='content'>
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